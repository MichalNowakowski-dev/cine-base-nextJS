"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { removeFavorite } from "@/app/lib/actions";
import { PosterSize } from "@/app/types/types";
import { notifySuccess } from "@/app/lib/toast";

type FavoritesMediaProps = {
  mediaType: "movie" | "tv";
  listType: "favorites" | "toWatch";
  userId: number;
  mediaList: {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    posterPath: string | null;
    releaseDate?: string | Date;
    firstAirDate?: string | Date;
  }[];
};

const FavoritesMedia = ({
  mediaType,
  listType,
  mediaList,
  userId,
}: FavoritesMediaProps) => {
  return (
    <ul className="space-y-6">
      {mediaList.map((media) => (
        <li
          key={media.id}
          className="flex items-start bg-gray-900 rounded-lg shadow-md overflow-hidden"
        >
          {/* Obrazek */}
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
              className="object-cover rounded-lg"
            />
          </Link>

          {/* Informacje o mediach */}
          <div className="ml-4 flex-1">
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
            <p className="text-sm text-gray-300 line-clamp-3">
              {media.overview || "Brak opisu."}
            </p>
          </div>

          {/* Przycisk Usuń */}
          <button
            onClick={async (e) => {
              e.stopPropagation();
              await removeFavorite(media.id, userId, mediaType);
              notifySuccess("Usunięto pomyślnie");
            }}
            className="ml-4 mt-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            aria-label={`Usuń z ${
              listType === "favorites" ? "ulubionych" : "do obejrzenia"
            }`}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesMedia;
