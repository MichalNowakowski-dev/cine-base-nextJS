"use client";
import Image from "next/image";
import { getImgUrl } from "../lib/utils";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { MediaType, PosterSize } from "../lib/types";

type MediaItem = {
  id: number;
  title?: string; // Dla filmów
  name?: string; // Dla seriali
  overview: string;
  poster_path: string | null;
  vote_average: number;
};

interface GenresListProps {
  mediaList: MediaItem[];
  mediaType: MediaType;
}

const GenresList = ({ mediaList, mediaType }: GenresListProps) => {
  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((mediaItem) => (
          <li
            key={uuid()}
            className="bg-zinc-800 text-white p-4 rounded-lg hover:shadow-lg hover:shadow-white hover:cursor-pointer transition-shadow"
          >
            <Link
              href={
                mediaType === "movie"
                  ? `/movie/${mediaItem.id}`
                  : `/show/${mediaItem.id}`
              }
            >
              <Image
                src={
                  mediaItem.poster_path
                    ? getImgUrl(PosterSize.LARGE, mediaItem.poster_path)
                    : "/no-poster-img.webp"
                }
                width={500}
                height={750}
                quality={100}
                alt={mediaItem.title || mediaItem.name || "Media Poster"}
                className="rounded-md mb-2  object-contain"
              />
              <h2 className="font-semibold truncate">
                {mediaItem.title || mediaItem.name}
              </h2>
              <p className="text-sm truncate">
                {mediaItem.overview || "Brak opisu."}
              </p>
              <span className="text-yellow-500">
                ⭐ {mediaItem.vote_average.toFixed(1)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenresList;
