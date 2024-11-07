import { fetchMediaList, fetchMovieList, fetchSeriesList } from "../lib/data";
import { MediaCategory, MovieCategory, SeriesCategory } from "../lib/types";
import MediaListController from "./MediaListController";

export default async function MediaListContainer({
  mediaCategory,

  label,
  movieCategories,
  seriesCategories,
  switchNames,
}: {
  mediaCategory?: MediaCategory;
  movieCategories?: [MovieCategory, MovieCategory];
  seriesCategories?: [SeriesCategory, SeriesCategory];

  label: string;
  switchNames: [string, string];
}) {
  if (mediaCategory) {
    const [moviesList, seriesList] = await Promise.all([
      await fetchMediaList("movie", mediaCategory),
      await fetchMediaList("tv", mediaCategory),
    ]);

    return (
      <MediaListController
        categories={["movie", "tv"]}
        list1={moviesList.results}
        list2={seriesList.results}
        switchNames={switchNames}
        label={label}
      />
    );
  }

  if (movieCategories) {
    const [list1, list2] = await Promise.all([
      await fetchMovieList(movieCategories[0]),
      await fetchMovieList(movieCategories[1]),
    ]);

    return (
      <MediaListController
        categories={movieCategories}
        list1={list1.results}
        list2={list2.results}
        switchNames={switchNames}
        label={label}
      />
    );
  }
  if (seriesCategories) {
    const [list1, list2] = await Promise.all([
      await fetchSeriesList(seriesCategories[0]),
      await fetchSeriesList(seriesCategories[1]),
    ]);

    return (
      <MediaListController
        categories={seriesCategories}
        list1={list1.results}
        list2={list2.results}
        switchNames={switchNames}
        label={label}
      />
    );
  }

  // return (
  //   <MediaListController
  //     movieList={moviesList.results}
  //     seriesList={seriesList.results}
  //     category={category}
  //     label={label}
  //   />
  // );
}
