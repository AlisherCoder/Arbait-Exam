/*
  Warnings:

  - You are about to drop the column `levelId` on the `OrderItems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_levelId_fkey";

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "levelId",
ADD COLUMN     "level_id" TEXT;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
