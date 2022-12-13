/* eslint disable */
import { KeystoneContext } from '@keystone-6/core/types';
import { CartItemCreateInput } from '.keystone/types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current user see if they are signed in
  const sesh = context.session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 2. Query the current user's cart
  const allCartItems = await context.query.CartItem.findMany({
    where: {
      user: { id: { equals: sesh.itemId } },
      product: { id: { equals: productId } },
    },
    query: 'id quantity',
  });

  // 3. See if the current item is in their cart
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // 4. If it is, increment by 1
    return await context.query.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  } else {
    // 5. If it isn't, create a new cart item
    return await context.query.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: sesh.itemId } },
        quantity: 1,
      },
    });
  }
}
