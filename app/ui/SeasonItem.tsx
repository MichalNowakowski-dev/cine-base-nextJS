"use client";

import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaClock } from "react-icons/fa";
import { PiPlayCircleThin } from "react-icons/pi";
import Image from "next/image";
import { formatRuntime, getImgUrl } from "../lib/utils";

type SeasonItemProps = {
  episodeCount: number;
  seasonData: any;
};

export default function SeasonItem({
  episodeCount,
  seasonData,
}: SeasonItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = seasonData;

  return (
    <li
      key={id}
      onClick={() => setIsOpen((prevState) => !prevState)}
      className=" bg-backgroundFooter rounded-lg w-full p-2 border border-borderPrimary lg:px-10"
    >
      <div
        className={`flex justify-between items-center w-full ${
          isOpen && "mb-5"
        }`}
      >
        <header className="flex items-center gap-3">
          <h3 className="lg:text-h3">{name}</h3>
          <span className="text-secondary lg:text-h5">
            {episodeCount + " " + "odcinków"}
          </span>
        </header>
        <button className="rounded-full border border-borderPrimary bg-backgroundLight p-3">
          {isOpen ? (
            <FaArrowUp color="gray" size={20} />
          ) : (
            <FaArrowDown color="gray" size={20} />
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="flex flex-col  gap-5 ">
          {seasonData.episodes.map((episode: any) => (
            <li
              className="bg-background p-6 flex flex-col lg:flex-row gap-4 rounded-lg w-full lg:rounded-none border-secondary lg:border-t lg:bg-transparent"
              key={episode.id}
            >
              <div className="flex items-center justify-between gap-1 lg:gap-3 lg:flex-row-reverse lg:basis-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <Image
                    alt="episode poster"
                    src={getImgUrl("w300", episode.still_path)}
                    width={300}
                    height={169}
                    className="rounded-lg border border-borderPrimary aspect-video "
                  />

                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-10 w-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-black/60">
                    <PiPlayCircleThin className="text-red-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                  </button>
                </div>
                <h4 className="text-h2 text-[#ffffff50]">
                  {episode.episode_number < 10
                    ? "0" + episode.episode_number
                    : episode.episode_number}
                </h4>
              </div>

              <div className="hidden lg:flex flex-col justify-between lg:basis-1/2">
                <div className="flex flex-col items-start gap-3 lg:flex-row-reverse lg:justify-between ">
                  <div className="flex justify-between items-center gap-1 py-1 px-2 bg-backgroundFooter rounded-lg border border-borderPrimary">
                    <FaClock color="grey" size={14} />
                    <span>{formatRuntime(episode.runtime)}</span>
                  </div>
                  <h4 className="text-h4 font-normal">{episode.name}</h4>
                </div>
                <p className="text-secondary">{episode.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
