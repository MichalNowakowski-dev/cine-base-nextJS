-- DropForeignKey
ALTER TABLE "FavoriteMovie" DROP CONSTRAINT "FavoriteMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteShow" DROP CONSTRAINT "FavoriteShow_showId_fkey";

-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShowRating" DROP CONSTRAINT "ShowRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToWatchMovie" DROP CONSTRAINT "ToWatchMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ToWatchShow" DROP CONSTRAINT "ToWatchShow_showId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteMovie" ADD CONSTRAINT "FavoriteMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteShow" ADD CONSTRAINT "FavoriteShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatchMovie" ADD CONSTRAINT "ToWatchMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatchShow" ADD CONSTRAINT "ToWatchShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
