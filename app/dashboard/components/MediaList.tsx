"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { removeItemFromUserList } from "@/app/lib/actions";
import { MediaItemPrisma, PosterSize } from "@/app/types/types";
import { notifySuccess } from "@/app/lib/toast";
import { MdDelete } from "react-icons/md";

type FavoritesMediaProps = {
  mediaType: "movie" | "tv";
  listType: "favorites" | "toWatch";
  userId: number;
  mediaList: MediaItemPrisma[];
};

const FavoritesMedia = ({
  mediaType,
  listType,
  mediaList,
  userId,
}: FavoritesMediaProps) => {
  return (
    <ul className="space-y-6 pb-5">
      {mediaList.map((media) => (
        <li
          key={media.id}
          className="flex items-start p-2 md:p-4 bg-gray-800 rounded-lg shadow-md overflow-hidden"
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

          <button
            onClick={async (e) => {
              e.stopPropagation();
              await removeItemFromUserList(
                media.id,
                userId,
                mediaType,
                listType
              );
              notifySuccess("Usunięto pomyślnie");
            }}
            className=" text-white rounded-full flex items-center justify-center "
            aria-label={`Usuń z ${
              listType === "favorites" ? "ulubionych" : "do obejrzenia"
            }`}
          >
            <MdDelete
              size={30}
              className="hover:text-red-700 transition-colors"
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesMedia;
