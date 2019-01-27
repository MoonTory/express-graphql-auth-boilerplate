import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    register(input: UserRegisterInput): User
    login(input: UserLoginInput): User
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserRegisterInput {
    email: String!
    username: String!
    password: String!
  }

  type Profile {
    email: String!
    username: String!
  }

  type User {
    id: ID!
    profile: Profile!
    createdAt: String!
  }
`