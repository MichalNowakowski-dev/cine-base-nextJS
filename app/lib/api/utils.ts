import { prisma } from "@/app/prisma";
import { MediaItem, MediaType } from "../types";

export const handleAddToWatchlist = async (
  mediaData: MediaItem,
  mediaType: MediaType
) => {
  const response = await fetch("/api/watchlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mediaData, mediaType }),
  });

  if (response.ok) {
    console.log("Media added to watchlist!");
  } else {
    console.error("Failed to add media to watchlist");
  }
};

export const handleRemoveFromWatchlist = async (
  mediaId: number,
  mediaType: MediaType
) => {
  const response = await fetch(
    `/api/watchlist/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Media deleted from watchlist!");
  } else {
    console.error("Failed to remove media from watchlist");
  }
};

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
export const handleAddToFavorites = async (
  mediaData: MediaItem,
  mediaType: MediaType
) => {
  const response = await fetch("/api/favorites/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mediaData, mediaType }),
  });

  if (response.ok) {
    console.log("Media added to favorites!");
  } else {
    console.error("Failed to add media to favorites");
  }
};

export const handleRemoveFromFavorites = async (
  mediaId: number,
  mediaType: MediaType
) => {
  const response = await fetch(
    `/api/favorites/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Media deleted from favorites!");
  } else {
    console.error("Failed to remove media from favorites");
  }
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
