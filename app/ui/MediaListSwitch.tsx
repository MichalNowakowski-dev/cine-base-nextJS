"use client";

import { useState } from "react";
import { MediaType } from "../lib/types";

export default function MediaListSwitch({
  categoryLabel_1,
  categoryLabel_2,
  onSwitch,
}: {
  categoryLabel_1: string;
  categoryLabel_2: string;
  onSwitch: (media: MediaType) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("movie");

  const handleSwitch = (mediaType: MediaType) => {
    onSwitch(mediaType);
    setActiveCategory(mediaType);
  };

  return (
    <div className="flex justify-center items-center bg-white border-none rounded-full p-1 min-w-32 w-48 max-w-80">
      <button
        onClick={() => handleSwitch("movie")}
        name={categoryLabel_1}
        className={`py-1 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear ${
          activeCategory === "movie" ? "bg-fade-red-to-black" : "bg-transparent"
        } ${activeCategory === "movie" ? "text-red-200" : "text-black"}`}
      >
        {categoryLabel_1}
      </button>
      <button
        onClick={() => handleSwitch("tv")}
        name={categoryLabel_2}
        className={`py-1 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear  ${
          activeCategory === "tv" ? "bg-fade-red-to-black" : "bg-transparent"
        } ${activeCategory === "tv" ? "text-red-200" : "text-black"}`}
      >
        {categoryLabel_2}
      </button>
    </div>
  );
}
