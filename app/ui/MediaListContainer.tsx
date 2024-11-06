import { fetchMediaList } from "../lib/data";
import { MediaItem } from "../lib/types";
import MediaListSwitch from "./MediaListSwitch";
import MediaScrollList from "./MediaScrollList";

export default async function MediaListContainer({
  mediaType,
  category,
  label,
}: {
  mediaType: string;
  category: "top_rated" | "popular" | "trending";
  label: string;
}) {
  const mediaList: MediaItem[] = (await fetchMediaList(mediaType, category))
    .results;
  let category1;
  let category2;

  switch (category) {
    case "popular":
      category1 = "Filmy";
      category2 = "Seriale";
      break;
    case "top_rated":
      category1 = "Filmy";
      category2 = "Seriale";
      break;
    case "trending":
      category1 = "Dziś";
      category2 = "Tydzień";
      break;

    default:
      category1 = "Filmy";
      category2 = "Seriale";
      break;
  }
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl">{label}</h2>
        <MediaListSwitch category1={category1} category2={category2} />
      </header>
      <MediaScrollList mediaType={mediaType} list={mediaList} />
    </>
  );
}
