import { prisma } from "@/app/prisma";
import { FormStyles } from "@/app/styles";
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
    <div className="bg-backgroundDashboardCard text-gray-300 p-6 rounded-lg flex flex-col gap-5 shadow-md">
      <h2 className="text-xl font-semibold text-white">Twoje listy</h2>
      <div>
        <p>
          Ulubione filmy:{" "}
          <span className="font-bold">{favoriteMovies.length}</span>
        </p>
        <p>
          Ulubione seriale:{" "}
          <span className="font-bold">{favoriteShows.length}</span>
        </p>
        <p>
          Filmy do obejrzenia:{" "}
          <span className="font-bold">{toWatchMovies.length}</span>
        </p>
        <p>
          Seriale do obejrzenia:{" "}
          <span className="font-bold">{toWatchShows.length}</span>
        </p>
      </div>
      <Link href={"/dashboard/lists"} className={FormStyles.submitButton}>
        Pokaż listy
      </Link>
    </div>
  );
}
