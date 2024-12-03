"use client";
import { MediaType } from "@/app/lib/types";
import { useState } from "react";

const MediaList = ({
  listType,
  mediaType,
}: {
  listType: "favorites" | "watchlist";
  mediaType: MediaType;
}) => {
  const [movies] = useState([
    { id: "asdasdas", title: "Popopoopo" },
    { id: "okokokok", title: "sdsdsdsds" },
  ]);

  if (!movies.length)
    return (
      <div>
        Brak listy typu {mediaType}, {listType}{" "}
      </div>
    );

  return (
    <div className="space-y-4">
      <h3 className="text-xl mb-2">
        {listType === "favorites" ? "Favorite Movies" : "Watchlist"}
      </h3>
      <ul className="space-y-2">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="flex items-center justify-between bg-gray-700 p-4 rounded"
          >
            <span>{movie.title}</span>
            <button className="bg-red-600 text-white p-2 rounded">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
