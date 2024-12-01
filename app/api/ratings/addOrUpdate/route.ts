import { prisma } from "@/app/prisma"; // Załóżmy, że masz ustawionego klienta Prisma
import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import { MediaItem, MediaType } from "@/app/lib/types";

export async function POST(req: NextRequest) {
  const session = await auth(); // Pobranie sesji
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = session.user;

  const {
    mediaData,
    mediaType,
    rating,
  }: { mediaData: MediaItem; mediaType: MediaType; rating: number } =
    await req.json();

  // Zakładając, że masz odpowiednią walidację
  if (rating < 0 || rating > 10) {
    return NextResponse.json(
      { message: "Invalid rating value" },
      { status: 400 }
    );
  }

  try {
    // Zależnie od typu medium (film/serial)

    // Sprawdź, czy film istnieje
    const media =
      mediaType === "movie"
        ? await prisma.movie.findUnique({
            where: { id: mediaData.id },
          })
        : await prisma.show.findUnique({
            where: { id: mediaData.id },
          });

    // Jeśli film nie istnieje, dodaj go do bazy
    if (!media) {
      if (mediaType === "movie") {
        await prisma.movie.create({
          data: {
            id: mediaData.id,
            title: mediaData.title as string,
            overview: mediaData.overview,
            releaseDate: new Date(mediaData.release_date as string),
          },
        });
      }

      await prisma.show.create({
        data: {
          id: mediaData.id,
          name: mediaData.name as string,
          overview: mediaData.overview,
          firstAirDate: new Date(mediaData.first_air_date as string),
        },
      });
    }

    const ratingRecord =
      mediaType === "movie"
        ? await prisma.movieRating.upsert({
            where: {
              userId_movieId: {
                userId: Number(id),
                movieId: Number(mediaData.id),
              },
            },
            update: { rating: Number(rating) },
            create: {
              userId: Number(id),
              movieId: Number(mediaData.id),
              rating: Number(rating),
            },
          })
        : await prisma.showRating.upsert({
            where: {
              userId_showId: {
                userId: Number(id),
                showId: Number(mediaData.id),
              },
            },
            update: { rating: Number(rating) },
            create: {
              userId: Number(id),
              showId: Number(mediaData.id),
              rating: Number(rating),
            },
          });
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
