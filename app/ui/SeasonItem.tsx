"use client";

import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import EpisodeItem from "./EpisodeItem";
import { Season } from "../lib/types";

type SeasonItemProps = {
  episodeCount: number;
  seasonData: Season;
};

type EpisodeItemType = {
  id: number;
  still_path: string | null;
  name: string;
  overview: string;
  episode_number: number;
  runtime: number | null;
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
          {seasonData.episodes.map((episode: EpisodeItemType) => (
            <EpisodeItem episode={episode} />
          ))}
        </ul>
      )}
    </li>
  );
}
