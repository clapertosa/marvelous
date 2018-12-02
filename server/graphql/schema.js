const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # User
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String!
    activated: Boolean!
    resetToken: String!
    resetTokenExpiration: String!
    created_at: String!
    updated_at: String!
  }

  type CurrentUser {
    userId: ID!
    name: String!
    email: String!
    avatar: String
    activated: Boolean!
    created_at: String!
  }

  type AuthData {
    userId: String!
  }

  input UserInputData {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
    avatar: String
  }

  # Configuration
  # Root Query
  type RootQuery {
    currentUser: CurrentUser
  }

  # Root Mutation
  type RootMutation {
    createUser(userInput: UserInputData!): User!
    login(email: String! password: String!): AuthData!
    logout: String
    changeAvatar(avatar: String!): String!
    changeName(name: String!): String!
    changeEmail(email: String! emailConfirm: String): String!
    changePassword(oldPassword: String! password: String! passwordConfirm: String!): String!,
    activateUser(token: String!): Boolean!,
    resetPassword(email: String!): Boolean!,
    newPassword(token: String! password: String! passwordConfirm: String!): Boolean!
  }

  # Schema Config
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
