// app/api/favorites/status/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );
  }

  try {
    // Sprawdzenie, czy film jest ulubiony przez użytkownika
    const favoriteMovie = await prisma.favoriteMovie.findFirst({
      where: {
        userId: Number(session.user.id),
        movieId: parseInt(movieId),
      },
    });

    return NextResponse.json({ isFavorite: Boolean(favoriteMovie) });
  } catch (error) {
    console.error("Error fetching favorite status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
