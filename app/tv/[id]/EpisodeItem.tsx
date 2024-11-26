"use client";

import React from "react";
import { PiPlayCircleThin } from "react-icons/pi";
import { formatRuntime, getImgUrl } from "../../lib/utils";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Episode, StillSize } from "../../lib/types";

type EpisodeItemProps = {
  episode: Episode;
};

export default function EpisodeItem({ episode }: EpisodeItemProps) {
  const pathname = usePathname();

  return (
    <li
      className="bg-background p-6 flex flex-col lg:flex-row gap-4 rounded-lg w-full lg:rounded-none border-secondary lg:border-t lg:bg-transparent"
      key={episode.id}
    >
      <div className="flex items-center justify-between gap-1 lg:gap-3 lg:flex-row-reverse lg:basis-1/2">
        <div className="relative">
          <div className="absolute inset-0 bg-black/30"></div>
          {episode.still_path ? (
            <Image
              alt="episode poster"
              src={getImgUrl(StillSize.LARGE, episode.still_path)}
              width={300}
              height={169}
              quality={100}
              className="rounded-lg border border-borderPrimary aspect-video "
            />
          ) : (
            <div className="w-[300px] h-[169px] bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <Link
            href={`${pathname}/episode/${episode.id}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-10 w-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-black/60"
          >
            <PiPlayCircleThin className="text-red-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
          </Link>
        </div>
        <h4 className="text-h2 text-[#ffffff50]">
          {episode.episode_number < 10
            ? "0" + episode.episode_number
            : episode.episode_number}
        </h4>
      </div>

      <div className="flex flex-col justify-between lg:basis-1/2">
        <div className="flex flex-row items-start gap-3 lg:flex-row-reverse lg:justify-between ">
          <div className="flex justify-between items-center gap-1 py-1 px-2 bg-backgroundFooter rounded-lg border border-borderPrimary">
            <FaClock color="grey" size={14} />
            <span>{formatRuntime(episode.runtime as number)}</span>
          </div>
          <h4 className="text-h4 font-normal">{episode.name}</h4>
        </div>
        <p className="text-secondary hidden lg:block">{episode.overview}</p>
      </div>
    </li>
  );
}
