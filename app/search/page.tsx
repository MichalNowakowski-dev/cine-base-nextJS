import AdvancedSearch from "./AdvancedSearch";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SearchToggle from "./SearchToggle";

type SearchParamsProps = {
  type: string;
  mediaType: string;
  query?: string;
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
  genres?: string;
  productionCountry?: string;
  page?: string;
};

export default async function SearchPage(props: {
  searchParams: Promise<SearchParamsProps>;
}) {
  const searchParams = await props.searchParams;

  const isFiltersOn = searchParams.type === "filters";
  const query = searchParams.query;

  return (
    <main className="min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col justify-between items-center gap-10 w-full max-w-screen-md">
          <div className="flex justify-center items-center gap-2">
            <span>Wyszukaj po frazie lub filtrach</span>
            <SearchToggle />
          </div>
        </div>

        {isFiltersOn ? <AdvancedSearch /> : <SearchBar />}
        {query && !isFiltersOn && (
          <h1 id="scrollToElement" className="text-xl font-bold">
            Wyniki wyszukiwania dla: {`"${query}"`}
          </h1>
        )}
        {isFiltersOn && (
          <h1 className="text-xl font-bold">
            Wyniki wyszukiwania prez filtry:
          </h1>
        )}

        <SearchResults searchParams={searchParams} />
      </div>
    </main>
  );
}
