import { graphQLSchemaExtension } from '@keystone-6/core';
import addToCart from './addToCart';
import checkout from './checkout';

// make a fake grapgql tagged template literal
// const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order,
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
