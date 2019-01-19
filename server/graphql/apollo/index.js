import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../schema';
import resolvers from '../resolvers';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

export default apollo;