import Link from "next/link";
import React from "react";

export default function UserLists({
  userListsLength,
}: {
  userListsLength: {
    favoriteMovies?: number;
    favoriteShows?: number;
    toWatchMovies?: number;
    toWatchShows?: number;
  };
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Twoje listy</h2>
      <p className="text-gray-300 mt-2">
        Ulubione filmy:{" "}
        <span className="font-bold">{userListsLength.favoriteMovies}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Ulubione seriale:{" "}
        <span className="font-bold">{userListsLength.favoriteShows}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Filmy do obejrzenia:{" "}
        <span className="font-bold">{userListsLength.toWatchMovies}</span>
      </p>
      <p className="text-gray-300 mt-2">
        Seriale do obejrzenia:{" "}
        <span className="font-bold">{userListsLength.toWatchShows}</span>
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
