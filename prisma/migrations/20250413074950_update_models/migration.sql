/*
  Warnings:

  - Added the required column `measure` to the `OrderTools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `OrderTools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_sum` to the `OrdersProfession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrdersProfession" DROP CONSTRAINT "OrdersProfession_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdersProfession" DROP CONSTRAINT "OrdersProfession_profession_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OrderTools" ADD COLUMN     "measure" "Measure" NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrdersProfession" ADD COLUMN     "level_id" TEXT,
ADD COLUMN     "total_sum" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "OrdersProfession" ADD CONSTRAINT "OrdersProfession_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProfession" ADD CONSTRAINT "OrdersProfession_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProfession" ADD CONSTRAINT "OrdersProfession_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
