import { list } from '@keystone-6/core';
import { relationship, integer } from '@keystone-6/core/fields';
import { isSignedIn, rules } from '../access';

export const CartItem = list({
  access: {
    operation: {
      create: isSignedIn,
    },
    filter: {
      query: rules.canOrder,
      update: rules.canOrder,
      delete: rules.canOrder,
    },
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },
  fields: {
    //   TODO: Custom Label in here
    quantity: integer({
      defaultValue: 1,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
