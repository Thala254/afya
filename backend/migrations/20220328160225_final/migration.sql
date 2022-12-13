-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "canManageProducts" BOOLEAN NOT NULL DEFAULT true,
    "canSeeOtherUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageRoles" BOOLEAN NOT NULL DEFAULT false,
    "canManageCart" BOOLEAN NOT NULL DEFAULT false,
    "canManageOrders" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Role" ("canManageCart", "canManageOrders", "canManageProducts", "canManageRoles", "canManageUsers", "canSeeOtherUsers", "id", "name") SELECT "canManageCart", "canManageOrders", "canManageProducts", "canManageRoles", "canManageUsers", "canSeeOtherUsers", "id", "name" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
