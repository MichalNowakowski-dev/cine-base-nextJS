"use client";

import { useRef } from "react";
import Image from "next/image";
import { moveMediaList } from "../../lib/utils";
import MediaListButton from "../MediaListCarousel/MediaListButton";

interface Video {
  id: string;
  key: string;
  name: string;
}

interface VideoCarouselProps {
  list: Video[];
  handleClick: (video: Video) => void; // Funkcja obsługująca kliknięcie na wideo
}

export default function VideoCarousel({
  list,
  handleClick,
}: VideoCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {list.map((video) => {
          const thumbnailSrc = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

          return (
            <li
              key={video.id}
              onClick={() => handleClick(video)} // Przekazujemy wybrany element do funkcji handleClick
              className="flex flex-col flex-shrink-0 w-[clamp(10rem,20vw,250px)] cursor-pointer space-y-1"
            >
              <div className="relative mb-2">
                <Image
                  src={thumbnailSrc}
                  alt={`${video.name} thumbnail`}
                  className="rounded-md object-cover w-full h-auto aspect-video"
                  height={90}
                  width={160}
                />
              </div>
              <h4 className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full group relative">
                <span
                  className={`inline-block transition-transform duration-300 ${
                    video.name.length > 24 ? "group-hover:animate-scroll" : ""
                  }`}
                >
                  {video.name}
                </span>
              </h4>
            </li>
          );
        })}
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
