"use client";

import Image from "next/image";
import { useRef } from "react";
import { MediaItem, PosterSize } from "@/app/lib/types";
import Link from "next/link";
import MediaRoundedRating from "../ui/mediaRoundedRating/MediaRoundedRating";
import { v4 as uuidv4 } from "uuid";

export default function MediaList({
  mediaType,
  list,
  className,
}: {
  mediaType?: string;
  className?: string;
  list: MediaItem[];
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className={`flex justify-between gap-4 min-w-full no-scrollbar overflow-x-auto lg:overflow-hidden ${className}`}
      >
        {list &&
          list.map(
            ({ id, poster_path, vote_average, media_type, character, job }) => (
              <li
                key={uuidv4()}
                className="text-sm bg-backgroundLight rounded-lg p-3 border border-transparent hover:border-zinc-400  relative"
              >
                <Link href={`/${mediaType || media_type}/${id}`}>
                  <div className="mb-2">
                    <Image
                      className="rounded-md aspect-[2/3] "
                      src={
                        poster_path
                          ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.LARGE}${poster_path}`
                          : "/no-poster-img.webp"
                      }
                      alt={"Movie image"}
                      width={500}
                      height={750}
                      quality={100}
                    />
                  </div>

                  {character && (
                    <p className="text-sm text-secondary">{character}</p>
                  )}
                  {job && <p className="text-sm text-secondary">{job}</p>}

                  <MediaRoundedRating
                    rating={vote_average}
                    strokeWidth={3}
                    className="top-1 right-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                </Link>
              </li>
            )
          )}
      </ul>
    </div>
  );
}
