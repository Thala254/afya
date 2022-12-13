// At it's simplest, the access control returns a yes or no value depending on the user's session
import type { Permission } from './schemas/fields';
import { permissionsList } from './schemas/fields';

export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    role?: {
      id: string;
      name: string;
    } & {
      [key in Permission]: boolean;
    };
  };
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
};

export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria -yes or no
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs) {
    return session?.data.name.includes('Yobs');
  },
};

// Rule based function - used for list access
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item
    if (isSignedIn({ session }))
      return { user: { id: { equals: session?.itemId } } };
    else return false;
  },
  canOrder({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item
    return { user: { id: { equals: session?.itemId } } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item
    return { order: { user: { id: { equals: session?.itemId } } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return true;
    }
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    //   They should only see available products (based on the status field)
    return { status: { equals: 'AVAILABLE' } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have the permission of canManageUsers
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only updatethemselves
    return { id: { equals: session?.itemId } };
  },
};
