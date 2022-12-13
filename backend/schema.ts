import { User } from './schemas/User';
import { Lists } from '.keystone/types';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { Role } from './schemas/Role';

export const lists: Lists = {
  User,
  Product,
  ProductImage,
  CartItem,
  OrderItem,
  Order,
  Role,
};
