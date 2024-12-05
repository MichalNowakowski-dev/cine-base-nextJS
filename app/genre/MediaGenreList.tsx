"use client";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { MediaType, PosterSize } from "../types/types";

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

const MediaGenreList = ({ mediaList, mediaType }: GenresListProps) => {
  return (
    <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {mediaList.map((mediaItem) => (
        <li
          key={uuid()}
          className="bg-zinc-800 text-white p-4 rounded-lg hover:shadow-lg hover:shadow-white hover:cursor-pointer transition-shadow"
        >
          <Link
            href={`/${mediaType}/${mediaItem.id}`}
            className="flex flex-col justify-between h-full"
          >
            <section>
              <Image
                src={
                  mediaItem.poster_path
                    ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.LARGE}${mediaItem.poster_path}`
                    : "/no-poster-img.webp"
                }
                width={500}
                height={750}
                quality={100}
                alt={mediaItem.title || mediaItem.name || "Media Poster"}
                className="rounded-md mb-2 aspect-[2/3]"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold">
                  {mediaItem.title || mediaItem.name}
                </h2>
                <p className="text-sm text-secondary truncate">
                  {mediaItem.overview || "Brak opisu."}
                </p>
              </div>
            </section>
            <span className="text-yellow-500">
              ⭐ {mediaItem.vote_average.toFixed(1)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MediaGenreList;
