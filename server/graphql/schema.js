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

  # API generic types
    type Url {
    type: String!
    url: String!
  }

  type Date {
    type: String!
    date: String!
  }

  type Price {
    type: String!
    price: Float!
  }

  type Image {
    path: String!
    extension: String!
  }

  # Comic
  type ComicCreator {
    items: [ComicCreatorItem]
  }

  type ComicCreatorItem {
    name: String!
    role: String!
  }

  type Comic {
    id: ID!
    title: String!
    description: String
    pageCount: Int
    creators: ComicCreator
    urls: [Url]
    dates: [Date]
    prices: [Price]
    thumbnail: Image
    images: [Image]
    characters: [Character]
  }

  type Comics {
    lastWeek: [Comic!]
    thisMonth: [Comic!]
  }

  # Characters
  type Character {
    id: ID!
    name: String!
    description: String
    thumbnail: Image
    comics: [Comic]
  }

  # Configuration
  # Root Query
  type RootQuery {
    currentUser: CurrentUser
    comics: Comics!
    comic(id: ID!): Comic
    character(id: ID!): Character
    searchComic(query: String!): [Comic]
    searchCharacter(query: String!): [Character]
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
