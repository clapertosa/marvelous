const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # Post
  type Post {
    id: ID!
    user_id: ID!
    content: String!
    created_at: String!
    updated_at: String!
  }

  # Picture
  type Picture {
    id: ID!
    album_id: ID!
    path: String!
    created_at: String!
    updated_at: String!
  }

  # Album
  type Album {
    id: ID!
    user_id: ID!
    title: String!
    pictures: [Picture!]
    created_at: String!
    updated_at: String!
  }

  # Profile
  type Profile {
    id: ID!
    user_id: ID!
    sex: String!
    birthDate: String!
    avatar: String!
    albums: [Album!]
    posts: [Post!]
  }

  # User
  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    password: String!
    activated: Boolean!
    resetToken: String!
    resetTokenExpiration: String!
    profile: Profile!
    created_at: String!
    updated_at: String!
  }

  input UserInputData {
    name: String!
    surname: String!
    email: String!
    sex: String!
    dobDay: Int!
    dobMonth: Int!
    dobYear: Int!
    password: String!
  }

  # Configuration
  # Root Query
  type RootQuery {
    create: String
  }

  # Root Mutation
  type RootMutation {
    createUser(userInput: UserInputData!): User!
  }

  # Schema Config
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
