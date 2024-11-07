"use client";

import { useState } from "react";
import MediaListSwitch from "./MediaListSwitch";
import MediaScrollList from "./MediaScrollList";
import { MediaCategory, MediaItem, MediaType } from "../lib/types";

type Props = {
  movieList: MediaItem[];
  seriesList: MediaItem[];
  category: MediaCategory;
  label: string;
};

export default function MediaListController({
  movieList,
  seriesList,
  category,
  label,
}: Props) {
  const [currentMediaType, setCurrentMediaType] = useState<MediaType>("movie");
  const [listToDisplay, setListToDisplay] = useState<MediaItem[]>(movieList);

  function handleSwitch(media: MediaType) {
    setListToDisplay(media === "movie" ? movieList : seriesList);
    setCurrentMediaType(media);
  }

  let categoryLabel_1, categoryLabel_2;
  switch (category) {
    case "popular":
    case "top_rated":
      categoryLabel_1 = "Filmy";
      categoryLabel_2 = "Seriale";
      break;
    default:
      categoryLabel_1 = "Filmy";
      categoryLabel_2 = "Seriale";
      break;
  }

  // Wybór listy do wyświetlenia w zależności od wybranego typu mediów

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl">{label}</h2>
        <MediaListSwitch
          categoryLabel_1={categoryLabel_1}
          categoryLabel_2={categoryLabel_2}
          onSwitch={handleSwitch}
        />
      </header>
      <MediaScrollList mediaType={currentMediaType} list={listToDisplay} />
    </>
  );
}
