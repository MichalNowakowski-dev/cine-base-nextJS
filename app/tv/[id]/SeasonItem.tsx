"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import EpisodeItem from "./EpisodeItem";
import { Season } from "../../types/types";
import { v4 as uuid } from "uuid";

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
  const contentRef = useRef<HTMLUListElement>(null);
  const [contentHeight, setContentHeight] = useState("0px");

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const { id, name } = seasonData;

  return (
    <li
      key={id}
      className="bg-backgroundFooter rounded-lg w-full p-2 border border-borderPrimary lg:px-10"
    >
      <div
        className={`flex justify-between items-center w-full`}
        onClick={toggleAccordion}
      >
        <header className="flex items-center gap-3">
          <h3 className="lg:text-h3">{name}</h3>
          <span className="text-secondary lg:text-h5">
            {episodeCount + " " + "odcinków"}
          </span>
        </header>
        <button
          className="rounded-full border border-borderPrimary bg-backgroundLight p-3"
          aria-expanded={isOpen}
          aria-controls={`season-${id}`}
        >
          {isOpen ? (
            <FaArrowUp color="gray" size={20} />
          ) : (
            <FaArrowDown color="gray" size={20} />
          )}
        </button>
      </div>
      <ul
        ref={contentRef}
        id={`season-${id}`}
        style={{ maxHeight: contentHeight }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out flex flex-col gap-5"
      >
        {seasonData.episodes.map((episode: EpisodeItemType) => (
          <EpisodeItem key={uuid()} episode={episode} />
        ))}
      </ul>
    </li>
  );
}
