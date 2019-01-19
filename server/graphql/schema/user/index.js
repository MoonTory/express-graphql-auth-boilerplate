import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    register(input: UserInput): User
  }

  input UserInput {
    id: ID!
    email: String!
    username: String!
    password: String!
    name: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
  }
`