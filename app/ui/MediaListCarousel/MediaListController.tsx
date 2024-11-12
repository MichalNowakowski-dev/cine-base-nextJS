"use client";

import { useState } from "react";
import MediaListSwitch from "./MediaListSwitch";
import MediaScrollList from "./MediaScrollList";
import { MediaItem } from "../../lib/types";

type Props = {
  list1: MediaItem[];
  list2: MediaItem[];
  switchNames: [string, string];
  label: string;
  categories: [string, string];
};

export default function MediaListController({
  list1,
  list2,
  switchNames,
  label,
  categories,
}: Props) {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [listToDisplay, setListToDisplay] = useState<MediaItem[]>(list1);
  const [showList, setShowList] = useState(true);

  function handleSwitch(category: string) {
    setShowList(false);

    setTimeout(() => {
      setListToDisplay(category === categories[0] ? list1 : list2);
      setCurrentCategory(category);
      setShowList(true);
    }, Number(process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME));
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl">{label}</h2>
        <MediaListSwitch
          switchNames={switchNames}
          switchCategories={categories}
          onSwitch={handleSwitch}
        />
      </header>

      <MediaScrollList
        mediaType={currentCategory}
        list={listToDisplay}
        className={`transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
