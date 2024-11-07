"use client";

import { useState } from "react";
import { MediaType } from "../lib/types";
import SwitchButton from "./SwitchButton";

export default function MediaListSwitch({
  switchCategories,
  switchNames,
  onSwitch,
}: {
  switchCategories: string[];
  switchNames: string[];
  onSwitch: (category: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState(switchCategories[0]);

  const handleSwitch = (switchCategory: string) => {
    onSwitch(switchCategory);
    setActiveCategory(switchCategory);
  };

  return (
    <div className="flex justify-center items-center bg-white border-none rounded-full p-1 min-w-32 w-48 max-w-80">
      <SwitchButton
        switchCategory={switchCategories[0]}
        handleSwitch={() => handleSwitch(switchCategories[0])}
        activeCategory={activeCategory}
      >
        {switchNames[0]}
      </SwitchButton>
      <SwitchButton
        switchCategory={switchCategories[1]}
        handleSwitch={() => handleSwitch(switchCategories[1])}
        activeCategory={activeCategory}
      >
        {switchNames[1]}
      </SwitchButton>
      {/* <button
        onClick={() => handleSwitch("tv")}
        name={categoryLabel_2}
        className={`py-1 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear  ${
          activeCategory === "tv" ? "bg-fade-red-to-black" : "bg-transparent"
        } ${activeCategory === "tv" ? "text-red-200" : "text-black"}`}
      >
        {categoryLabel_2}
      </button> */}
    </div>
  );
}
