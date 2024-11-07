"use client";

import Image from "next/image";
import { useRef } from "react";
import MediaListButton from "./MediaListButton";
import { MediaItem } from "../lib/types";
import Link from "next/link";

export default function MediaScrollList({
  mediaType,
  list,
}: {
  mediaType: string;
  list: MediaItem[];
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  const moveMediaList = (direction: string) => {
    if (listRef.current) {
      if (direction === "left") {
        listRef.current.scrollLeft -= listRef.current.offsetWidth;
      } else {
        listRef.current.scrollLeft += listRef.current.offsetWidth;
      }
    }
  };

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="flex gap-3 w-full max-w-screen-xl overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth"
      >
        {list.map(
          ({
            id,
            poster_path,
            // genre_ids,
            title,
            release_date,
            // vote_average,
            name,
            first_air_date,
          }) => (
            <li
              key={id}
              className="text-sm min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px]"
            >
              <Link href={`/${mediaType}/${id}`}>
                <div className="mb-2 w-full h-auto aspect-[2/3] relative">
                  <Image
                    className="rounded-md object-cover"
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}original${poster_path}`}
                    alt={"Movie image"}
                    fill
                    sizes="(max-width: 640px) 125px, (max-width: 768px) 150px, (max-width: 1024px) 175px, (max-width: 1280px) 200px, 225px"
                    quality={100}
                  />
                </div>
                <h4 className="break-words text-wrap">{title || name}</h4>
                <p className="text-blue-400">
                  {release_date?.slice(0, 4) || first_air_date?.slice(0, 4)}
                </p>
              </Link>
            </li>
          )
        )}
      </ul>
      <MediaListButton direction="left" handleMove={moveMediaList} />
      <MediaListButton direction="right" handleMove={moveMediaList} />
    </div>
  );
}
