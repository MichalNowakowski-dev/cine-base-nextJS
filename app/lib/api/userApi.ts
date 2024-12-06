import { prisma } from "@/app/prisma";
import { type MediaItem, type MediaType } from "../../types/types";

export const getWatchlistStatus = async (
  mediaId: number,
  userId: number,
  mediaType: MediaType
) => {
  if (!userId) return false;

  const toWatchMedia =
    mediaType === "movie"
      ? await prisma.toWatchMovie.findFirst({
          where: {
            userId: userId,
            movieId: mediaId,
          },
        })
      : await prisma.toWatchShow.findFirst({
          where: {
            userId: userId,
            showId: mediaId,
          },
        });

  return Boolean(toWatchMedia);
};

export const getFavoriteStatus = async (
  mediaId: number,
  userId: number,
  mediaType: MediaType
) => {
  if (!userId) return false;
  const toWatchMedia =
    mediaType === "movie"
      ? await prisma.favoriteMovie.findFirst({
          where: {
            userId: userId,
            movieId: mediaId,
          },
        })
      : await prisma.favoriteShow.findFirst({
          where: {
            userId: userId,
            showId: mediaId,
          },
        });

  return Boolean(toWatchMedia);
};
export const getUserRating = async (
  mediaId: number,
  userId: number,
  mediaType: MediaType
) => {
  if (!userId) return null;

  const userRating =
    mediaType === "movie"
      ? await prisma.movieRating.findFirst({
          where: {
            userId: userId,
            movieId: mediaId,
          },
        })
      : await prisma.showRating.findFirst({
          where: {
            userId: userId,
            showId: mediaId,
          },
        });

  return userRating ? userRating.rating : null;
};

export const fetchUserMediaStatus = async (
  mediaId: number,
  userId: number,
  mediaType: MediaType
) => {
  const [favoriteStatus, watchlistStatus, ratingStatus] = await Promise.all([
    getFavoriteStatus(mediaId, userId, mediaType),
    getWatchlistStatus(mediaId, userId, mediaType),
    getUserRating(mediaId, userId, mediaType),
  ]);

  return { favoriteStatus, watchlistStatus, ratingStatus };
};
export const ensureMediaExists = async (
  mediaData: MediaItem,
  mediaType: MediaType
) => {
  const isMovie = mediaType === "movie";

  const media = isMovie
    ? await prisma.movie.findUnique({ where: { id: mediaData.id } })
    : await prisma.show.findUnique({ where: { id: mediaData.id } });

  if (!media) {
    if (isMovie) {
      // Utwórz rekord filmu
      await prisma.movie.create({
        data: {
          id: mediaData.id,
          title: mediaData.title as string,
          overview: mediaData.overview || "",
          posterPath: mediaData.poster_path,
          releaseDate: new Date(mediaData.release_date as string),
        },
      });
      console.log("Swtorzony obiekt filmu");
    } else {
      // Utwórz rekord serialu
      await prisma.show.create({
        data: {
          id: mediaData.id,
          name: mediaData.name as string,
          overview: mediaData.overview || "",
          posterPath: mediaData.poster_path,
          firstAirDate: new Date(mediaData.first_air_date as string),
        },
      });
      console.log("Swtorzony obiekt serialu");
    }
  }
};
