/* eslint disable */
import { KeystoneContext } from '@keystone-6/core/types';
import { OrderCreateInput } from '.keystone/types';
import { CartItemCreateInput } from '.keystone/types';
import stripeConfig from '../lib/stripe';
import formatMoney from '../lib/formatMoney';

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1.Make sure they are signed in
  const userId = context.session.itemId;

  if (!userId)
    throw new Error('Sorry! You must be signed in to create an order!');

  // 1.5. Query the current user
  const user = await context.query.User.findOne({
    where: { id: userId },
    query: `
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  // console.dir(user, { depth: null });

  // 2. Calculate the total price for their order
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) => {
      return tally + cartItem.quantity * cartItem.product.price;
    },
    0
  );

  // 3. Create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  // 4. Convert the cartitems to orderitems
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // 5. Create the order and return it
  const order = await context.query.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
    query: 'id total charge items {id } user {id}',
  });

  // 6. Clean up any old cart item
  const cartItemsIds = user.cart.map((cartItem) => {
    return { id: cartItem.id };
  });

  await context.query.CartItem.deleteMany({
    where: cartItemsIds,
    query: 'id',
  });

  return order;
}
