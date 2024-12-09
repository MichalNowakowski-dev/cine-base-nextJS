import { prisma } from "@/app/prisma";
import { Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserLists({ session }: { session: Session }) {
  if (!session?.user) return redirect("/sign-in");

  const userInfo = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    include: {
      favoriteMovies: {
        where: {
          userId: Number(session.user.id),
        },
      },
      favoriteShows: {
        where: {
          userId: Number(session.user.id),
        },
      },
      toWatchMovies: {
        where: {
          userId: Number(session.user.id),
        },
      },
      toWatchShows: {
        where: {
          userId: Number(session.user.id),
        },
      },
    },
  });
  if (!userInfo) return;
  const { favoriteMovies, favoriteShows, toWatchMovies, toWatchShows } =
    userInfo;

  return (
    <div className="bg-backgroundDashboardCard  p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Twoje listy</h2>
      <p className="text-gray-300 mt-2">
        Ulubione filmy:{" "}
        <span className="font-bold">{favoriteMovies.length}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Ulubione seriale:{" "}
        <span className="font-bold">{favoriteShows.length}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Filmy do obejrzenia:{" "}
        <span className="font-bold">{toWatchMovies.length}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Seriale do obejrzenia:{" "}
        <span className="font-bold">{toWatchShows.length}</span>
      </p>
      <Link
        href={"/dashboard/lists"}
        className=" block w-max mt-4 p-2 bg-purple-600 text-white rounded"
      >
        Pokaż listy
      </Link>
    </div>
  );
}
