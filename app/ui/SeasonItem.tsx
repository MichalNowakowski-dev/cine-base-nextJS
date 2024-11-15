"use client";

import { useState } from "react";
import { SeasonItemType } from "../lib/types";
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
      className=" bg-backgroundFooter rounded-lg w-full p-3 border border-borderPrimary"
    >
      <div className="flex justify-between items-center mb-6">
        <header className="flex items-center gap-3">
          <h3>{name}</h3>
          <span className="text-secondary">
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
              className="bg-background p-6 flex flex-col gap-4 rounded-lg w-full lg:border-t lg:bg-transparent"
              key={episode.id}
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <Image
                    alt="episode poster"
                    src={getImgUrl("w300", episode.still_path)}
                    width={300}
                    height={169}
                    className="rounded-lg border border-borderPrimary aspect-video w-[182px]"
                  />

                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-12 w-12 rounded-full bg-black/60">
                    <PiPlayCircleThin size={30} />
                  </button>
                </div>
                <h4 className="text-h2 text-[#ffffff50]">
                  {episode.episode_number < 10
                    ? "0" + episode.episode_number
                    : episode.episode_number}
                </h4>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex justify-between items-center gap-1 py-1 px-2 bg-backgroundFooter rounded-lg border border-borderPrimary">
                  <FaClock color="grey" size={14} />
                  <span>{formatRuntime(episode.runtime)}</span>
                </div>
                <div>
                  <h4 className="text-h4 font-normal">{episode.name}</h4>
                  <p className="text-secondary">{episode.air_date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
