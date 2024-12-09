"use client";
import React, { Suspense, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import AdvancedSearch from "./AdvancedSearch";
import SwitchButton from "./SwitchButton";
import { SearchItem } from "../types/types";

export default function SearchContainer({
  page,
  query,
  pagesTotal,
  list,
}: {
  page: number;
  query: string;
  pagesTotal: number;
  list: SearchItem[];
}) {
  const [isAdvancedSearchOn, setIsAdvancedSearchOn] = useState(false);

  const handleChange = () => {
    setIsAdvancedSearchOn((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col justify-between items-center gap-10 w-full max-w-screen-md">
        <div className="flex justify-center items-center gap-2">
          <span>Wyszukaj po frazie</span>
          <SwitchButton checked={isAdvancedSearchOn} onChange={handleChange} />
          <span>Wyszukaj po filtrach</span>
        </div>
      </div>

      {isAdvancedSearchOn ? <AdvancedSearch /> : <SearchBar />}
      {query && !isAdvancedSearchOn && (
        <h1 className="text-xl font-bold">
          Wyniki wyszukiwania dla: {`"${query}"`}
        </h1>
      )}
      {isAdvancedSearchOn && (
        <h1 className="text-xl font-bold">Wyniki wyszukiwania prez filtry:</h1>
      )}

      <Suspense fallback={"Loading..."}>
        <SearchResults page={page} pagesTotal={pagesTotal} list={list} />
      </Suspense>
    </div>
  );
}
