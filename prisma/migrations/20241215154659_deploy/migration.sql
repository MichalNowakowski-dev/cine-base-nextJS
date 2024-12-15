-- DropForeignKey
ALTER TABLE "FavoriteMovie" DROP CONSTRAINT "FavoriteMovie_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteShow" DROP CONSTRAINT "FavoriteShow_userId_fkey";

-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShowRating" DROP CONSTRAINT "ShowRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToWatchMovie" DROP CONSTRAINT "ToWatchMovie_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToWatchShow" DROP CONSTRAINT "ToWatchShow_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "trialPeriodEnd" DROP NOT NULL,
ALTER COLUMN "trialPeriodEnd" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "FavoriteMovie" ADD CONSTRAINT "FavoriteMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteShow" ADD CONSTRAINT "FavoriteShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatchMovie" ADD CONSTRAINT "ToWatchMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatchShow" ADD CONSTRAINT "ToWatchShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
