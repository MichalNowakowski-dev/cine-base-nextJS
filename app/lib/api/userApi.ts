import { prisma } from "@/app/prisma";
import {
  MediaItemPrisma,
  RatedMediaItemPrisma,
  UserRatingMovieItem,
  UserRatingShowItem,
  type MediaItem,
  type MediaType,
} from "../../types/types";

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

async function getUserMovies(moviesWithId: UserRatingMovieItem[] = []) {
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
async function getUserShows(showsWithId: UserRatingShowItem[] = []) {
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

type userInfoProps = {
  favoriteMovies?: UserRatingMovieItem[];
  favoriteShows?: UserRatingShowItem[];
  toWatchMovies?: UserRatingMovieItem[];
  toWatchShows?: UserRatingShowItem[];
};

export const getLists = async (userInfo: userInfoProps) => {
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
};
export const getUserRatingLists = async (
  userId: number
): Promise<{
  ratedMovies: RatedMediaItemPrisma[];
  ratedShows: RatedMediaItemPrisma[];
}> => {
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
          // Zawężanie typów na podstawie mediaType
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
          return null; // Nie dodajemy elementów bez dopasowania
        })
        .filter((item): item is RatedMediaItemPrisma => item !== null); // Usuwamy wartości null
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
};

export async function getUserName(userId: number) {
  try {
    const username = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });
    if (!username?.name) return "Błąd pobierania nazwy użytkownika";
    return username.name;
  } catch (error) {
    console.error(error);
    return "Błąd pobierania nazwy użytkownika";
  }
}
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getUserPassword = async (userId: number) => {
  const userPassword = await prisma.user.findUnique({ where: { id: userId } });
  return userPassword?.passwordHash;
};
export const getUserSubscriptionInfo = async (userId: number) => {
  const userSubscription = await prisma.subscription.findFirst({
    where: { userId, status: "active" },
    include: {
      plan: {
        select: {
          name: true,
          monthlyPrice: true,
          yearlyPrice: true,
        },
      },
    },
  });

  return userSubscription;
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
