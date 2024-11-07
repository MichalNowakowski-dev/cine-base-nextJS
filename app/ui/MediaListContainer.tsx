import { fetchMediaList } from "../lib/data";
import MediaListController from "./MediaListController";

export default async function MediaListContainer({
  category,
  label,
}: {
  category: "top_rated" | "popular";
  label: string;
}) {
  // const moviesList: MediaItem[] = (await fetchMediaList("movie", category)).results;
  // const seriesList: MediaItem[] = (await fetchMediaList("tv", category)).results;

  const [moviesList, seriesList] = await Promise.all([
    await fetchMediaList("movie", category),
    await fetchMediaList("tv", category),
  ]);

  return (
    <MediaListController
      movieList={moviesList.results}
      seriesList={seriesList.results}
      category={category}
      label={label}
    />
  );
}
