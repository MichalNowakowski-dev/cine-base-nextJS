"use client";

import Image from "next/image";
import { useRef } from "react";
import { MediaItem, PosterSize } from "../../lib/types";
import Link from "next/link";
import MediaRoundedRating from "../MediaRoundedRating";
import { v4 as uuidv4 } from "uuid";
import { getImgUrl } from "@/app/lib/utils";

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
          list.map(({ id, poster_path, vote_average }) => (
            <li
              key={uuidv4()}
              className="text-sm bg-backgroundLight rounded-lg p-3 border border-transparent hover:border-zinc-400 flex-grow max-w-[240px] relative"
            >
              <Link href={`/${mediaType === "movie" ? "movie" : "show"}/${id}`}>
                <div className="mb-2">
                  <Image
                    className="rounded-md object-cover w-full min-w-[140px] lg:min-w-[160px] aspect-[2/3] "
                    src={
                      poster_path
                        ? getImgUrl(PosterSize.LARGE, poster_path)
                        : "/no-poster-img.webp"
                    }
                    alt={"Movie image"}
                    width={513}
                    height={342}
                    quality={100}
                  />
                </div>
              </Link>
              <MediaRoundedRating
                rating={vote_average}
                strokeWidth={3}
                className="top-1 right-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
