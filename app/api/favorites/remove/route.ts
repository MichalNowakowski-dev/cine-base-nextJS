import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";

export async function DELETE(request: NextRequest) {
  const session = await auth(); // Pobranie sesji
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const mediaId = searchParams.get("mediaId");
  const mediaType = searchParams.get("mediaType");

  if (!mediaId) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }
  try {
    if (mediaType === "movie") {
      await prisma.favoriteMovie.deleteMany({
        where: {
          userId: Number(session.user.id),
          movieId: Number(mediaId),
        },
      });
    }
    // Znajdź i usuń ulubiony film użytkownika
    await prisma.favoriteShow.deleteMany({
      where: {
        userId: Number(session.user.id),
        showId: Number(mediaId),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite movie:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
