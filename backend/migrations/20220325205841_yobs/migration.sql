-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "photo" TEXT,
    "price" INTEGER,
    "quantity" INTEGER,
    "order" TEXT,
    CONSTRAINT "OrderItem_photo_fkey" FOREIGN KEY ("photo") REFERENCES "ProductImage" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_order_fkey" FOREIGN KEY ("order") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" INTEGER,
    "user" TEXT,
    "charge" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Order_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "OrderItem_photo_idx" ON "OrderItem"("photo");

-- CreateIndex
CREATE INDEX "OrderItem_order_idx" ON "OrderItem"("order");

-- CreateIndex
CREATE INDEX "Order_user_idx" ON "Order"("user");
