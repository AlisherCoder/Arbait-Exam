/*
  Warnings:

  - You are about to drop the column `bank_acc` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `bank_code` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `bank_name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `tax_id` on the `Company` table. All the data in the column will be lost.
  - Added the required column `bank` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inn` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mfo` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rs` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "bank_acc",
DROP COLUMN "bank_code",
DROP COLUMN "bank_name",
DROP COLUMN "tax_id",
ADD COLUMN     "bank" TEXT NOT NULL,
ADD COLUMN     "inn" TEXT NOT NULL,
ADD COLUMN     "mfo" TEXT NOT NULL,
ADD COLUMN     "rs" TEXT NOT NULL;
