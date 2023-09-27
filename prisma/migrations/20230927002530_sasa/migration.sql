/*
  Warnings:

  - You are about to drop the column `wishlistId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_wishlistId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "wishlistId";

-- AlterTable
ALTER TABLE "Wishlist" ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_productId_key" ON "Wishlist"("productId");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
