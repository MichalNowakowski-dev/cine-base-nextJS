"use client";

import Image from "next/image";
import { useRef } from "react";
import { MediaItem } from "../../lib/types";
import Link from "next/link";
import MediaRoundedRating from "../MediaRoundedRating";
import { v4 as uuidv4 } from "uuid";

export default function MediaList({
  mediaType,
  list,
  className,
}: {
  mediaType: string;
  className?: string;
  list: MediaItem[];
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className={`flex gap-2 justify-start min-w-full no-scrollbar overflow-x-auto lg:overflow-hidden ${className}`}
      >
        {list &&
          list.map(
            ({
              id,
              poster_path,
              title,
              release_date,
              vote_average,
              name,
              first_air_date,
            }) => (
              <li
                key={uuidv4()}
                className="text-sm bg-backgroundLight rounded-lg p-3 border border-transparent hover:border-zinc-400 flex-grow max-w-[240px] relative"
              >
                <Link
                  href={`/${mediaType === "movie" ? "movie" : "show"}/${id}`}
                >
                  <div className="mb-2">
                    <Image
                      className="rounded-md object-cover w-full  min-w-[140px] lg:min-w-[160px] "
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}original${poster_path}`}
                      alt={"Movie image"}
                      width={200}
                      height={300}
                      quality={100}
                    />
                  </div>
                  <h4 className="break-words text-wrap">{title || name}</h4>
                  <p className="text-blue-400">
                    {release_date?.slice(0, 4) || first_air_date?.slice(0, 4)}
                  </p>
                </Link>
                <MediaRoundedRating
                  rating={vote_average}
                  strokeWidth={3}
                  className="top-1 right-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
              </li>
            )
          )}
      </ul>
    </div>
  );
}
