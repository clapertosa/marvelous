const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

const PORT = process.env.PORT || 8080;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
