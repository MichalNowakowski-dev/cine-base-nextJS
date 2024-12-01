import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";
import { MediaItem, MediaType } from "@/app/lib/types";

export async function POST(request: NextRequest) {
  const session = await auth(); // Pobranie sesji
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    mediaData,
    mediaType,
  }: { mediaData: MediaItem; mediaType: MediaType } = await request.json(); // Odczytanie ID filmu z body

  if (!mediaData.id || typeof mediaData.id !== "number") {
    return NextResponse.json({ error: "Invalid media ID" }, { status: 400 });
  }

  const userId = Number(session.user.id);
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
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
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json({ error: "Invalid media ID" }, { status: 400 });
  }
}
