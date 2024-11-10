"use client";

import Image from "next/image";
import { useRef } from "react";
import MediaListButton from "./MediaListButton";
import { MediaItem } from "../../lib/types";
import Link from "next/link";
import MediaRoundedRating from "../MediaRoundedRating";
import { moveMediaList } from "@/app/lib/utils";

export default function MediaScrollList({
  mediaType,
  list,
}: {
  mediaType: string;
  list: MediaItem[];
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="flex gap-4 w-full max-w-screen-xl overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth"
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
                key={id}
                className="text-sm min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px]"
              >
                <Link href={`/${mediaType}/${id}`}>
                  <div className="mb-2 w-full h-auto aspect-[2/3] relative">
                    <Image
                      className="rounded-md object-cover"
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}original${poster_path}`}
                      alt={"Movie image"}
                      fill
                      sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, (max-width: 1280px) 160px, 180px"
                      quality={100}
                    />
                    <MediaRoundedRating
                      rating={vote_average}
                      size={40}
                      strokeWidth={3}
                      className="top-1 right-1"
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
      <MediaListButton
        direction="left"
        handleMove={() => moveMediaList("left", listRef)}
      />
      <MediaListButton
        direction="right"
        handleMove={() => moveMediaList("right", listRef)}
      />
    </div>
  );
}
