/*
  Warnings:

  - The primary key for the `Plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `planId` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropIndex
DROP INDEX "Plan_id_key";

-- AlterTable
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Plan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "planId",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
