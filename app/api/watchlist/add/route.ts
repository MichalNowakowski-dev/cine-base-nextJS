import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";
import { MediaItem, MediaType } from "@/app/lib/types";
import { ensureMediaExists } from "@/app/lib/api/utils";

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
    ensureMediaExists(mediaData, mediaType);

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
    console.log("Dodano do ulubionych: ");
    console.log(toWatch);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json({ error: "Invalid media ID" }, { status: 400 });
  }
}
