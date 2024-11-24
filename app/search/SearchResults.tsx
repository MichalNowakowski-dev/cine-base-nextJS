import React from "react";
import { fetchResultsByQuery } from "../lib/data";
import SearchResult from "./SearchResult";
import { SearchItem } from "../lib/types";

export default async function SearchResults({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  if (!query) return;
  const resp = await fetchResultsByQuery(query, page);
  const results: SearchItem[] = await resp.results;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {results.map((result: SearchItem) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </ul>
  );
}