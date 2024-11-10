import {
  fetchMediaList,
  fetchMovieList,
  fetchSeriesList,
  fetchTrendingList,
} from "../../lib/data";
import {
  MediaCategory,
  MediaListContainerProps,
  MovieCategory,
  SeriesCategory,
  TimeWindow,
} from "../../lib/types";
import MediaListController from "./MediaListController";

async function fetchMediaData(
  mediaCategory?: MediaCategory,
  movieCategories?: [MovieCategory, MovieCategory],
  seriesCategories?: [SeriesCategory, SeriesCategory],
  timeWindow?: TimeWindow
) {
  if (timeWindow && mediaCategory) {
    return await Promise.all([
      fetchTrendingList("movie", timeWindow),
      fetchTrendingList("tv", timeWindow),
    ]);
  }

  if (mediaCategory) {
    return await Promise.all([
      fetchMediaList("movie", mediaCategory),
      fetchMediaList("tv", mediaCategory),
    ]);
  }

  if (movieCategories) {
    return await Promise.all([
      fetchMovieList(movieCategories[0]),
      fetchMovieList(movieCategories[1]),
    ]);
  }

  if (seriesCategories) {
    return await Promise.all([
      fetchSeriesList(seriesCategories[0]),
      fetchSeriesList(seriesCategories[1]),
    ]);
  }

  throw new Error("No valid categories provided");
}

export default async function MediaListContainer({
  mediaCategory,
  label,
  movieCategories,
  seriesCategories,
  switchNames,
  timeWindow,
}: MediaListContainerProps) {
  const [list1, list2] = await fetchMediaData(
    mediaCategory,
    movieCategories,
    seriesCategories,
    timeWindow
  );

  const categories = movieCategories || seriesCategories || ["movie", "tv"];

  return (
    <MediaListController
      categories={categories}
      list1={list1.results}
      list2={list2.results}
      switchNames={switchNames}
      label={label}
    />
  );
}
