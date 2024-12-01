import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import { MediaItem, MediaType } from "@/app/lib/types";
import { ensureMediaExists } from "@/app/lib/api/utils";

// Funkcja do obsługi walidacji oceny
const validateRating = (rating: number) => {
  if (rating < 0 || rating > 10) {
    throw new Error("Invalid rating value");
  }
};

// Funkcja do dodawania/aktualizowania oceny
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

// Główna funkcja POST
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);

    const {
      mediaData,
      mediaType,
      rating,
    }: { mediaData: MediaItem; mediaType: MediaType; rating: number } =
      await req.json();

    validateRating(rating);
    await ensureMediaExists(mediaData, mediaType);
    const ratingRecord = await upsertRating(
      userId,
      mediaData,
      mediaType,
      rating
    );

    return NextResponse.json(
      { message: "Rating added/updated", rating: ratingRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add/update rating" },
      { status: 500 }
    );
  }
}
