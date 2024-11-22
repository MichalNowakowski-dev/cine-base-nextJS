"use client";

import Image from "next/image";
import PaginatedSection from "../PaginatedSection";
import { usePagination } from "@/app/hooks/usePagination";
import { useMemo } from "react";

interface Video {
  id: string;
  key: string;
  name: string;
}

interface VideoCarouselProps {
  list: Video[];
  handleClick: (video: Video) => void; // Funkcja obsługująca kliknięcie na wideo
  children: React.ReactNode;
}
const ITEMS_PER_VIEW = 3;
const MAX_ITEMS = 15;

export default function VideoCarousel({
  list,
  handleClick,
  children,
}: VideoCarouselProps) {
  const slicedList = useMemo(() => list.slice(0, MAX_ITEMS), [list]);
  const {
    activePage,
    maxPageListNumber,
    paginatedList,
    isMobile,
    showList,
    handleMoveList,
  } = usePagination(slicedList, ITEMS_PER_VIEW);

  const videoList = isMobile ? slicedList : paginatedList;

  return (
    <>
      <PaginatedSection
        activePage={activePage}
        maxPageListNumber={maxPageListNumber}
        handleMoveList={handleMoveList}
      >
        {children}
      </PaginatedSection>

      <ul
        className={`flex gap-2 overflow-x-auto no-scrollbar scroll-smooth transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"} `}
      >
        {videoList.map((video) => {
          const thumbnailSrc = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

          return (
            <li
              key={video.id}
              onClick={() => handleClick(video)}
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
              <h4 className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full text-center group relative">
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
    </>
  );
}
