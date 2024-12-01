-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planId" TEXT,
ADD COLUMN     "subscriptionEnd" TIMESTAMP(3),
ADD COLUMN     "subscriptionStart" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "yearlyPrice" DOUBLE PRECISION NOT NULL,
    "devicesNumber" INTEGER NOT NULL,
    "trialPeriod" INTEGER NOT NULL,
    "cancelAllowed" BOOLEAN NOT NULL,
    "hdr" BOOLEAN NOT NULL,
    "dolbyAtmos" BOOLEAN NOT NULL,
    "adsFree" BOOLEAN NOT NULL,
    "offlineView" BOOLEAN NOT NULL,
    "familySharing" INTEGER,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);
