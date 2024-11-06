"use client";

import { useState } from "react";

export default function MediaListSwitch({
  category1,
  category2,
}: {
  category1: string;
  category2: string;
}) {
  const [activeCategory, setActiveCategory] = useState(category1);

  return (
    <div className="flex justify-center items-center bg-white border-none rounded-full p-1 min-w-32 w-48 max-w-80">
      <button
        onClick={() => setActiveCategory(category1)}
        name={category1}
        className={`py-1 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear ${
          activeCategory === category1
            ? "bg-fade-red-to-black"
            : "bg-transparent"
        } ${activeCategory === category1 ? "text-red-200" : "text-black"}`}
      >
        Filmy
      </button>
      <button
        onClick={() => setActiveCategory(category2)}
        name={category2}
        className={`py-1 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear  ${
          activeCategory === category2
            ? "bg-fade-red-to-black"
            : "bg-transparent"
        } ${activeCategory === category2 ? "text-red-200" : "text-black"}`}
      >
        Seriale
      </button>
    </div>
  );
}
