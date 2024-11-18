import { fetchMediaList, fetchTrendingList } from "../../lib/data";
import {
  MediaCategory,
  MediaListContainerProps,
  MediaType,
  TimeWindow,
} from "../../lib/types";
import MediaListController from "./MediaListController";

async function fetchMediaData(
  mediaType: MediaType,
  mediaCategory: MediaCategory,
  timeWindow?: TimeWindow
) {
  let page = 1;
  let list;

  try {
    if (timeWindow && mediaCategory) {
      list = await fetchTrendingList(mediaType, timeWindow, page);
    }
    list = await fetchMediaList(mediaType, mediaCategory, page);
    const filteredList = Array.isArray(list?.results)
      ? list.results.filter((media: any) => media.vote_count > 300)
      : [];
    let fullList = [...filteredList];

    while (fullList.length < 20) {
      if (timeWindow && mediaCategory) {
        list = await fetchTrendingList(mediaType, timeWindow, ++page);
      } else {
        list = await fetchMediaList(mediaType, mediaCategory, ++page);
      }

      const filteredList = Array.isArray(list?.results)
        ? list.results.filter((media: any) => media.vote_count > 300)
        : [];

      if (filteredList.length === 0) {
        console.warn("No more results to fetch, exiting loop.");
        break;
      }

      fullList = [...fullList, ...filteredList.slice(0, 20 - fullList.length)];
    }

    return fullList;
  } catch (error) {
    console.error("Error creating full list:", error);
    return [];
  }
}

export default async function MediaListContainer({
  mediaCategory,
  mediaType,
  timeWindow,
  children,
  itemsPerViewNumber,
}: MediaListContainerProps) {
  const list = await fetchMediaData(mediaType, mediaCategory, timeWindow);

  return (
    <MediaListController
      itemsPerViewNumber={itemsPerViewNumber}
      list={list}
      mediaType={mediaType}
    >
      {children}
    </MediaListController>
  );
}
