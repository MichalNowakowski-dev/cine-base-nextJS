import SearchResult from "./SearchResult";
import { SearchItem } from "../types/types";
import Pagination from "../genre/Pagination";
import {
  fetchResultsByQuery,
  fetchSearchListByFilters,
} from "../lib/api/tmdbApi";

type SearchParamsProps = {
  type: string;
  mediaType: string;
  query?: string;
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
  movieGenres?: string;
  tvGenres?: string;
  productionCountry?: string;
  page?: string;
};

export default async function SearchResults({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const mediaType = searchParams.mediaType || "movie";
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const type = searchParams.type || "query";

  const params = new URLSearchParams(searchParams);
  params.delete("mediaType");
  if (mediaType === "movie") {
    params.delete("tv-genres");
  } else {
    params.delete("movie-genres");
  }
  const newParams = params;

  const filtersResults = await fetchSearchListByFilters(
    mediaType,
    newParams,
    page
  );
  const queryResults = await fetchResultsByQuery(query, page);

  let renderResults;
  if (type === "query") {
    renderResults = queryResults.results;
  } else {
    renderResults = filtersResults.results;
  }

  if (renderResults.length < 1) return;
  return (
    <div className="flex flex-col items-center">
      <ul className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {renderResults.map((result: SearchItem) => (
          <SearchResult key={result.id} result={result} />
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={
          type === "query"
            ? queryResults.total_pages
            : filtersResults.total_pages
        }
      />
    </div>
  );
}
