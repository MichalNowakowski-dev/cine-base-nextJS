/*
  Warnings:

  - You are about to drop the column `dolbyAtmos` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `hdr` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DolbyAtmos` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HDR` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popular` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familySharing` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "dolbyAtmos",
DROP COLUMN "hdr",
ADD COLUMN     "DolbyAtmos" BOOLEAN NOT NULL,
ADD COLUMN     "HDR" BOOLEAN NOT NULL,
ADD COLUMN     "popular" BOOLEAN NOT NULL,
DROP COLUMN "familySharing",
ADD COLUMN     "familySharing" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_key" ON "Plan"("id");
