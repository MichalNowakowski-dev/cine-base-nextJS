/*
  Warnings:

  - You are about to drop the column `planId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStart` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "planId",
DROP COLUMN "subscriptionEnd",
DROP COLUMN "subscriptionStart";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,
    "subscriptionStart" TIMESTAMP(3) NOT NULL,
    "subscriptionEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "trialPeriod" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
