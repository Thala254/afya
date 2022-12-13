import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { text, relationship, integer, virtual } from '@keystone-6/core/fields';
import { isSignedIn, rules } from '../access';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  access: {
    operation: {
      create: isSignedIn,
      update: () => false,
      delete: () => false,
    },
    filter: {
      query: rules.canOrder,
    },
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        },
      }),
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
