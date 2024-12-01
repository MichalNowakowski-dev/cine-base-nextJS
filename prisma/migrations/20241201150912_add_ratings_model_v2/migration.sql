/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `MovieRating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,showId]` on the table `ShowRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieRating_userId_movieId_key" ON "MovieRating"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowRating_userId_showId_key" ON "ShowRating"("userId", "showId");
