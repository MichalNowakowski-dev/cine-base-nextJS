/*
  Warnings:

  - Added the required column `subject` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "subject" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
