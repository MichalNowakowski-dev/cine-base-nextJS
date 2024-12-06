-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShowRating" DROP CONSTRAINT "ShowRating_showId_fkey";

-- DropForeignKey
ALTER TABLE "ShowRating" DROP CONSTRAINT "ShowRating_userId_fkey";

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
