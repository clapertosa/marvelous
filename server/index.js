const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const client = redis.createClient(process.env.REDIS_URL);
const keys = require("./config/keys");

const PORT = process.env.PORT || 8080;

// Cors configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Helmet configuration
app.use(helmet());

// Express-Session and Connect-Redis configurations
app.use(
  session({
    store: new RedisStore({
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
app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    context: { req, res },
    formatError: err => {
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

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
