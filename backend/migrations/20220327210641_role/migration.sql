-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "photo" TEXT,
    "status" TEXT DEFAULT 'DRAFT',
    "price" INTEGER,
    "user" TEXT,
    CONSTRAINT "Product_photo_fkey" FOREIGN KEY ("photo") REFERENCES "ProductImage" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("description", "id", "name", "photo", "price", "status") SELECT "description", "id", "name", "photo", "price", "status" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_photo_key" ON "Product"("photo");
CREATE INDEX "Product_user_idx" ON "Product"("user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
