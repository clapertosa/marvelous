const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "client", dev });

const handle = app.getRequestHandler();
const helmet = require("helmet");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const client = redis.createClient(process.env.REDIS_URL);
const keys = require("./config/keys");

const PORT = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // Trust first proxy if in production
    if (server.get("env") === "production") {
      server.set("trust proxy", 1);
    }

    server.use((req, res, next) => {
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });

    // Serve public folder to root
    // server.use(express.static(__dirname + "/public"));

    // Helmet configuration
    server.use(helmet());

    // Express-Session and Connect-Redis configurations
    server.use(
      session({
        store:
          process.env.NODE_ENV === "production"
            ? new RedisStore({
                url: process.env.REDIS_URL
              })
            : new RedisStore({
                host: "localhost",
                port: 6379,
                client
              }),
        name: "qob",
        resave: false,
        saveUninitialized: false,
        secret: keys.SESSION,
        unset: "destroy",
        cookie: {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000
        }
      })
    );

    // Redis messages on connect/error
    client.on("connect", () => console.log("Connected to Redis database"));
    client.on("error", () => console.log("Can't connect to Redis database"));

    // Graphql configuration
    server.use("/graphql", (req, res) => {
      graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: process.env.NODE_ENV !== "production",
        context: { req, res },
        customFormatErrorFn: err => {
          if (!err.originalError) {
            return err;
          }
          const data = err.originalError.data;
          const message = err.message || "An error occurred.";
          const code = err.originalError.code || 500;
          return { message: message, code: code, data: data };
        }
      })(req, res);
    });

    // Dynamic routes
    server.get("/comic/:id", (req, res) => {
      const actualPage = "/comic";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/character/:id", (req, res) => {
      const actualPage = "/character";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Server started on port ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
