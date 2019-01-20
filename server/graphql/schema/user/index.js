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