"use client";
import { MediaType, PosterSize, RatedMediaItemPrisma } from "@/app/types/types";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { notifySuccess } from "@/app/lib/toast";
import { removeItemFromUserList } from "@/app/lib/actions";
import Accordion from "@/app/components/ui/accordion/Accordion";
import { MdDelete } from "react-icons/md";

export default function RatingList({
  mediaList = [],
  mediaType,
  userId,
}: {
  mediaList: RatedMediaItemPrisma[];
  mediaType: MediaType;
  userId: number;
}) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Sort media list based on rating
  const sortedMediaList = [...mediaList].sort((a, b) => {
    return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
  });

  const isMovie = mediaType === "movie";

  return (
    <div className="p-6  text-gray-200">
      <h1 className="text-2xl font-bold mb-4">
        {isMovie ? "Ocenione filmy" : "Ocenione seriale"}
      </h1>

      <div className="mb-6">
        <label htmlFor={"sort" + "_" + mediaType} className="mr-4">
          Sortuj według oceny:
        </label>
        <select
          id={"sort" + "_" + mediaType}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="bg-backgroundDashboardCard text-white px-3 py-2 rounded"
        >
          <option value="desc">Malejąco</option>
          <option value="asc">Rosnąco</option>
        </select>
      </div>

      {mediaList.length > 0 ? (
        <Accordion
          title={isMovie ? "Twoje oceny filmów" : "Twoje oceny seriali"}
          noNumber
        >
          <ul className="space-y-4">
            {sortedMediaList.map((media) => (
              <li
                key={media.id}
                className="flex items-start p-2 md:p-4 bg-backgroundDashboardCard rounded-lg shadow-md overflow-hidden"
              >
                <Link
                  href={`/${mediaType}/${media.id}`}
                  className="block flex-shrink-0"
                >
                  <Image
                    src={
                      media.posterPath
                        ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${media.posterPath}`
                        : "/no-poster-img.webp"
                    }
                    alt={`${media.title || media.name} poster`}
                    width={120}
                    height={180}
                    className="object-cover rounded-lg w-20 sm:w-24 md:w-28"
                  />
                </Link>

                <div className="ml-4  sm:pt-4 flex-1">
                  <Link href={`/${mediaType}/${media.id}`}>
                    <h3 className="text-lg font-semibold text-white">
                      {media.title || media.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(
                      media.releaseDate || media.firstAirDate || ""
                    ).getFullYear() || "N/A"}
                  </p>
                  <p className="hidden text-sm text-gray-300 xs:line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                    {media.overview || "Brak opisu."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-yellow-300">
                    {media.rating}/10
                  </span>

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await removeItemFromUserList(
                        media.id,
                        userId,
                        mediaType,
                        "ratings"
                      );
                      notifySuccess("Usunięto ocenę pomyślnie");
                    }}
                    className=" text-white rounded-full flex items-center justify-center "
                    aria-label={`Usuń ocene`}
                  >
                    <MdDelete
                      size={30}
                      className="hover:text-red-700 transition-colors"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Accordion>
      ) : (
        <p>
          ~~ Nie oceniłeś/aś jeszcze żadnego {isMovie ? "filmu" : "serialu"} ~~
        </p>
      )}
    </div>
  );
}
