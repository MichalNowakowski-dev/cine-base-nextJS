"use server";

import { prisma } from "@/app/prisma";
import {
  MediaItem,
  MediaItemPrisma,
  MediaType,
  RatedMediaItemPrisma,
  userInfoProps,
  UserRatingMovieItem,
  UserRatingShowItem,
} from "@/app/types/types";
import { revalidatePath } from "next/cache";

export async function ensureMediaExists(
  mediaData: MediaItem,
  mediaType: MediaType
) {
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
      return true;
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
      return true;
    }
  }
}

export async function removeItemFromUserList(
  id: number,
  userId: number,
  mediaType: MediaType,
  listType: "favorites" | "toWatch" | "ratings"
) {
  if (!userId) {
    throw new Error("user not logged in");
  }
  try {
    if (listType === "favorites") {
      if (mediaType === "movie") {
        await prisma.favoriteMovie.deleteMany({
          where: {
            userId: Number(userId),
            movieId: Number(id),
          },
        });
      }

      await prisma.favoriteShow.deleteMany({
        where: {
          userId: Number(userId),
          showId: Number(id),
        },
      });
    } else if (listType === "ratings") {
      if (mediaType === "movie") {
        await prisma.movieRating.deleteMany({
          where: {
            userId: Number(userId),
            movieId: Number(id),
          },
        });
      }

      await prisma.showRating.deleteMany({
        where: {
          userId: Number(userId),
          showId: Number(id),
        },
      });
    } else {
      if (mediaType === "movie") {
        await prisma.toWatchMovie.deleteMany({
          where: {
            userId: Number(userId),
            movieId: Number(id),
          },
        });
      }

      await prisma.toWatchShow.deleteMany({
        where: {
          userId: Number(userId),
          showId: Number(id),
        },
      });
    }
    revalidatePath("/dashboard/lists");
  } catch (error) {
    console.error(error);

    throw new Error("Error occured while removing fav media");
  }
}

export async function addFavorite(
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number
) {
  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    await ensureMediaExists(mediaData, mediaType);

    const favorite =
      mediaType === "movie"
        ? await prisma.favoriteMovie.create({
            data: {
              userId: userId,
              movieId: mediaData.id,
            },
          })
        : await prisma.favoriteShow.create({
            data: {
              userId: userId,
              showId: mediaData.id,
            },
          });
    console.log("Dodano do ulubionych: ");
    console.log(favorite);
    return favorite;
  } catch (error) {
    console.error("Błąd:", error);
    throw new Error("Error occured while adding media to favorites");
  }
}
export async function addToWatch(
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number
) {
  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    await ensureMediaExists(mediaData, mediaType);

    const toWatch =
      mediaType === "movie"
        ? await prisma.toWatchMovie.create({
            data: {
              userId: userId,
              movieId: mediaData.id,
            },
          })
        : await prisma.toWatchShow.create({
            data: {
              userId: userId,
              showId: mediaData.id,
            },
          });
    console.log("Dodano do obejrzenia: ");
    console.log(toWatch);
    return toWatch;
  } catch (error) {
    console.error("Błąd:", error);
    throw new Error("Error occured while adding media to toWatch");
  }
}
export async function setNewRating(
  mediaType: MediaType,
  mediaData: MediaItem,
  userId: number,
  rating: number
) {
  const validateRating = (rating: number) => {
    if (rating < 0 || rating > 10) {
      throw new Error("Invalid rating value");
    }
  };

  const upsertRating = async (
    userId: number,
    mediaData: MediaItem,
    mediaType: MediaType,
    rating: number
  ) => {
    const isMovie = mediaType === "movie";

    return isMovie
      ? prisma.movieRating.upsert({
          where: {
            userId_movieId: { userId, movieId: mediaData.id },
          },
          update: { rating },
          create: { userId, movieId: mediaData.id, rating },
        })
      : prisma.showRating.upsert({
          where: {
            userId_showId: { userId, showId: mediaData.id },
          },
          update: { rating },
          create: { userId, showId: mediaData.id, rating },
        });
  };

  if (!userId) {
    throw new Error("user not logged in");
  }

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    validateRating(rating);
    await ensureMediaExists(mediaData, mediaType);
    const ratingRecord = await upsertRating(
      userId,
      mediaData,
      mediaType,
      rating
    );

    return ratingRecord;
  } catch (error) {
    console.error(error);
    throw new Error("Error occured while setting rating");
  }
}

export async function getWatchlistStatus(
  mediaId: number,
  userId: number,
  mediaType: MediaType
) {
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
}
export async function getFavoriteStatus(
  mediaId: number,
  userId: number,
  mediaType: MediaType
) {
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
}
export async function getRatingStatus(
  mediaId: number,
  userId: number,
  mediaType: MediaType
) {
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
}

export async function getUserMediaStatus(
  mediaId: number,
  userId: number,
  mediaType: MediaType
) {
  const [favoriteStatus, watchlistStatus, ratingStatus] = await Promise.all([
    getFavoriteStatus(mediaId, userId, mediaType),
    getWatchlistStatus(mediaId, userId, mediaType),
    getRatingStatus(mediaId, userId, mediaType),
  ]);

  return { favoriteStatus, watchlistStatus, ratingStatus };
}

export async function getUserMovies(moviesWithId: UserRatingMovieItem[] = []) {
  const movieIds = moviesWithId.map((item) => item.movieId);

  const movies = await prisma.movie.findMany({
    where: {
      id: {
        in: movieIds,
      },
    },
  });

  return movies;
}
export async function getUserShows(showsWithId: UserRatingShowItem[] = []) {
  const showIds = showsWithId.map((item) => item.showId);

  const shows = await prisma.show.findMany({
    where: {
      id: {
        in: showIds,
      },
    },
  });

  return shows;
}

export async function getUserLists(userInfo: userInfoProps) {
  try {
    return await Promise.all([
      getUserMovies(userInfo.favoriteMovies),
      getUserShows(userInfo.favoriteShows),
      getUserMovies(userInfo.toWatchMovies),
      getUserShows(userInfo.toWatchShows),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function getUserRatingLists(userId: number): Promise<{
  ratedMovies: RatedMediaItemPrisma[];
  ratedShows: RatedMediaItemPrisma[];
}> {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        movieRating: {
          where: {
            userId: Number(userId),
          },
        },
        showRating: {
          where: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!userInfo) {
      throw new Error("User not found");
    }

    function addRatingToMediaArray(
      media: UserRatingMovieItem[] | UserRatingShowItem[],
      details: MediaItemPrisma[],
      mediaType: MediaType
    ): RatedMediaItemPrisma[] {
      return details
        .map((detail) => {
          if (mediaType === "movie") {
            const matchingMedia = (media as UserRatingMovieItem[]).find(
              (movie) => movie.movieId === detail.id
            );
            if (matchingMedia) {
              return {
                ...detail,
                rating: matchingMedia.rating,
              };
            }
          } else if (mediaType === "tv") {
            const matchingMedia = (media as UserRatingShowItem[]).find(
              (show) => show.showId === detail.id
            );
            if (matchingMedia) {
              return {
                ...detail,
                rating: matchingMedia.rating,
              };
            }
          }
          return null;
        })
        .filter((item): item is RatedMediaItemPrisma => item !== null);
    }

    const [movies, shows] = await Promise.all([
      getUserMovies(userInfo.movieRating),
      getUserShows(userInfo.showRating),
    ]);

    const ratingLists = {
      movies: userInfo.movieRating,
      shows: userInfo.showRating,
    };

    const ratedMovies = addRatingToMediaArray(
      ratingLists.movies,
      movies,
      "movie"
    );
    const ratedShows = addRatingToMediaArray(ratingLists.shows, shows, "tv");
    return { ratedMovies, ratedShows };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { ratedMovies: [], ratedShows: [] };
  }
}
