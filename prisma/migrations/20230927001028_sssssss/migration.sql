/*
  Warnings:

  - You are about to drop the `WishlistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_wishlistId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "wishlistId" INTEGER;

-- DropTable
DROP TABLE "WishlistItem";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
