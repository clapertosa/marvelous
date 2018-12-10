const knex = require("../db/knex");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const util = require("util");
const keys = require("../config/keys");
const axios = require("../axiosInstance");

module.exports = {
  createUser: async ({ userInput }, { req }) => {
    const errors = [];

    if (validator.isEmpty(userInput.name)) {
      errors.push({ message: "A name is required" });
    }

    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email not valid" });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 8 })
    ) {
      errors.push({ message: "Password too short" });
    }

    if (
      userInput.password &&
      userInput.password !== userInput.passwordConfirm
    ) {
      errors.push({
        message: "Password and password confirmation don't match"
      });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const userExists = await knex("users")
      .first()
      .select()
      .where({ email: validator.normalizeEmail(userInput.email) });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = await knex("users").insert(
      {
        name: userInput.name,
        email: validator.normalizeEmail(userInput.email),
        password: hashedPassword
      },
      ["id", "name", "email"]
    );
    // Send and email for account activation
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, keys.JWT, {
      expiresIn: "2hr"
    });

    sgMail.setApiKey(keys.SENDGRID);
    const msg = {
      to: user[0].email,
      from: "marvelous@no-reply.com",
      templateId: "d-d3c6bd2e713245b796afbd2ed1be4840",
      dynamic_template_data: {
        subject: "🕸 Marvelous - Account Activation 🚀",
        body:
          "Welcome to Marvelous! Please activate your account clicking on Activate button:",
        url: `${req.get("origin")}/register/validate?token=${token}`
      }
    };
    await sgMail.send(msg);

    return { id: user[0].id, email: user[0].email, name: user[0].name };
  },
  login: async ({ email, password }, { req }) => {
    const errors = [];

    if (validator.isEmpty(email)) {
      errors.push({ message: "Email field is required" });
    }

    if (validator.isEmpty(password)) {
      errors.push({ message: "Password field is required" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const user = await knex("users")
      .first()
      .where({ email });
    if (!user) {
      throw new Error("Email or password wrong");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password wrong");
    }

    // Save a session with logged user and save user in req.user
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      activated: user.activated,
      resetToken: user.resetToken,
      resetTokenExpiration: user.resetTokenExpiration,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    req.session.save(err => (err ? console.log(err) : null));
    return { userId: user.id };
  },
  logout: async (args, { req, res }) => {
    req.session ? req.session.destroy() : null;
    res.clearCookie("qob");
    return "Goodbye!";
  },
  currentUser: async (args, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }
    const res = await knex("users")
      .select(["id", "name", "email", "avatar", "activated", "created_at"])
      .where({ id: req.session.user.id });

    return {
      userId: res[0].id,
      name: res[0].name,
      email: res[0].email,
      avatar: res[0].avatar,
      activated: res[0].activated,
      created_at: res[0].created_at
    };
  },
  changeAvatar: async ({ avatar }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    const errors = [];

    if (validator.isEmpty(avatar)) {
      errors.push({ message: "Avatar must be provided" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const res = await knex("users")
      .where({ id: req.session.user.id })
      .update({ avatar });

    req.session.user.avatar = avatar;
    return "Avatar changed";
  },
  changeName: async ({ name }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    const errors = [];

    if (validator.isEmpty(name)) {
      errors.push({ message: "A name is required" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const res = await knex("users")
      .where({ id: req.session.user.id })
      .update({ name }, ["name"]);

    req.session.user.name = res[0].name;
    return res[0].name;
  },
  changeEmail: async ({ email, emailConfirm }, { req }) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({ message: "Email not valid" });
    }

    if (validator.isEmpty(email) || validator.isEmpty(emailConfirm)) {
      errors.push({ message: "Email and confirm email are required" });
    }

    if (
      validator.normalizeEmail(email) !== validator.normalizeEmail(emailConfirm)
    ) {
      errors.push({ message: "Email and confirm email must be the same" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    if (req.session.user.email === email) {
      throw new Error("Same email has been provided");
    }

    const userExists = await knex("users")
      .first()
      .where({ email });

    if (userExists) {
      throw new Error("Email already exists");
    }

    const res = await knex("users")
      .first()
      .where({ id: req.session.user.id })
      .update({ email: validator.normalizeEmail(email) }, ["email"]);

    req.session.user.email = res[0].email;
    return res[0].email;
  },
  changePassword: async (
    { oldPassword, password, passwordConfirm },
    { req }
  ) => {
    if (!req.session.isLoggedIn) {
      return null;
    }

    const errors = [];

    if (
      validator.isEmpty(oldPassword) ||
      validator.isEmpty(password) ||
      validator.isEmpty(passwordConfirm)
    ) {
      errors.push({
        message: "Old password, password and confirm password are required"
      });
    }

    if (!validator.isLength(password, { min: 8 })) {
      errors.push({ message: "Password too short (minimum: 8)" });
    }

    if (password !== passwordConfirm) {
      errors.push({
        message: "Password and password confirm must be the same"
      });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const oldPasswordFromDb = await knex("users")
      .first()
      .select(["password"])
      .where({ id: req.session.user.id });

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      oldPasswordFromDb.password
    );

    if (!isPasswordMatch) {
      throw new Error("Old password is wrong");
    }

    const newPassword = await bcrypt.hash(password, 12);

    await knex("users")
      .where({ id: req.session.user.id })
      .update({ password: newPassword });

    return "Password changed";
  },
  activateUser: async ({ token }, { req }) => {
    const userDecoded = await jwt.decode(token);
    const isActivated = await knex("users")
      .select("activated")
      .where({ id: userDecoded.id, email: userDecoded.email });

    if (isActivated[0].activated) {
      throw new Error("Your account has been already activated");
    }

    const user = await jwt.verify(token, keys.JWT, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Send a new email for account activation

          const newToken = await jwt.sign(
            { id: userDecoded.id, email: userDecoded.email },
            keys.JWT,
            {
              expiresIn: "2hr"
            }
          );

          sgMail.setApiKey(keys.SENDGRID);
          const msg = {
            to: userDecoded.email,
            from: "marvelous@no-reply.com",
            templateId: "d-d3c6bd2e713245b796afbd2ed1be4840",
            dynamic_template_data: {
              subject: "🕸 Marvelous - Account Activation 🚀",
              body:
                "Welcome to Marvelous! Please activate your account clicking on Activate button:",
              url: `${req.get("origin")}/register/validate?token=${newToken}`
            }
          };
          await sgMail.send(msg);
          throw new Error("Activation link expired. A new email has been sent");
        }
        throw err;
      }
      return decoded;
    });

    await knex("users")
      .where({ id: user.id, email: user.email })
      .update({ activated: true });

    return true;
  },
  resetPassword: async ({ email }, { req }) => {
    const errors = [];

    if (!validator.isEmail(validator.normalizeEmail(email))) {
      errors.push({ message: "Email is not valid" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const user = await knex("users")
      .first()
      .where({ email: validator.normalizeEmail(email) });

    if (!user) {
      throw new Error("Email not found");
    }

    const randomBytes = util.promisify(crypto.randomBytes);
    // Create a token in db
    let token;
    try {
      token = await randomBytes(32);
    } catch (e) {
      throw new Error("An error occurred [CRP]");
    }
    token = token.toString("hex");

    await knex("users")
      .where({ email })
      .update({
        resetToken: token,
        resetTokenExpiration: new Date(Date.now() + 3600000)
      });

    // Send an email
    sgMail.setApiKey(keys.SENDGRID);
    const msg = {
      to: validator.normalizeEmail(email),
      from: "marvelous@no-reply.com",
      subject: "🕸 Marvelous - Password Reset 🚀",
      html: `<!DOCTYPE html><head><style>* {text-align: center;}</style></head><html><body>Please click on the "Reset Password" button to reset your password:<br/><a href="${req.get(
        "origin"
      )}/login/new-password?token=${token}"><button>Reset Password</button></a></body><html>`,
      url: `${req.get("origin")}/register/validate?token=${token}`
    };
    await sgMail.send(msg);

    return true;
  },
  newPassword: async ({ token, password, passwordConfirm }, { req }) => {
    const user = await knex("users")
      .select("id", "resetTokenExpiration")
      .where({ resetToken: token });
    if (!user[0]) {
      throw new Error("Wrong token");
    }
    if (user[0].resetTokenExpiration < new Date()) {
      throw new Error("Password reset token expired");
    }

    const errors = [];

    if (validator.isEmpty(password) || validator.isEmpty(passwordConfirm)) {
      errors.push({ message: "Both fields are required" });
    } else if (!validator.isLength(password, { min: 8 })) {
      errors.push({ message: "Password too short" });
    }

    if (password !== passwordConfirm) {
      errors.push({
        message: "Password and confirm password must be the same"
      });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    //Hash password and save
    const hashedPassword = await bcrypt.hash(password, 12);

    await knex("users")
      .where({ id: user[0].id })
      .update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration: null
      });

    return true;
  },
  comics: async (args, { req }) => {
    const lastWeek = await axios.get("/comics", {
      params: {
        format: "comic",
        formatType: "comic",
        noVariants: true,
        dateDescriptor: "lastWeek",
        limit: 10
      }
    });

    const thisMonth = await axios.get("/comics", {
      params: {
        format: "comic",
        formatType: "comic",
        noVariants: true,
        dateDescriptor: "thisMonth",
        limit: 10
      }
    });

    return {
      thisMonth: thisMonth.data.data.results,
      lastWeek: lastWeek.data.data.results
    };
  },
  comic: async ({ id }, { req }) => {
    const res = await axios.get(`/comics/${id}`);
    let charactersURI = res.data.data.results[0].characters.collectionURI;
    charactersURI = charactersURI.substring(
      charactersURI.indexOf("public") + 6,
      charactersURI.length
    );
    const characters = await axios.get(charactersURI);
    res.data.data.results[0].characters = characters.data.data.results;
    return res.data.data.results[0];
  },
  character: async ({ id }, { req }) => {
    const res = await axios.get(`/characters/${id}`);
    let comicsURI = res.data.data.results[0].comics.collectionURI;
    comicsURI = comicsURI.substring(
      comicsURI.indexOf("public") + 6,
      comicsURI.length
    );
    const comics = await axios.get(comicsURI);
    res.data.data.results[0].comics = comics.data.data.results;
    return res.data.data.results[0];
  },
  searchComic: async ({ query }, { req }) => {
    const res = await axios.get("/comics", {
      params: {
        format: "comic",
        formatType: "comic",
        titleStartsWith: query,
        orderBy: "title",
        noVariants: true,
        limit: 12
      }
    });
    return res.data.data.results;
  },
  searchCharacter: async ({ query }, { req }) => {
    const res = await axios.get("/characters", {
      params: {
        nameStartsWith: query,
        orderBy: "name",
        limit: 12
      }
    });
    return res.data.data.results;
  }
};
