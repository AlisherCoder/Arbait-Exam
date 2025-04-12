/*
  Warnings:

  - A unique constraint covering the columns `[name_uz]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_ru]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_en]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "OrderTools" (
    "id" TEXT NOT NULL,
    "order_id" TEXT,
    "tool_id" TEXT,
    "count" INTEGER NOT NULL,
    "total_sum" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderTools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_uz_key" ON "Region"("name_uz");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_ru_key" ON "Region"("name_ru");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_en_key" ON "Region"("name_en");

-- AddForeignKey
ALTER TABLE "OrderTools" ADD CONSTRAINT "OrderTools_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTools" ADD CONSTRAINT "OrderTools_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;
