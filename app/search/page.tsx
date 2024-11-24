import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Suspense } from "react";

export default async function SearchPage(props: {
  searchParams?: Promise<{ page?: string; query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl flex flex-col gap-5">
      <div className="flex flex-col gap-10">
        <SearchBar />
        {query && (
          <h1 className="text-xl font-bold">
            Wyniki wyszukiwania dla: {`"${query}"`}
          </h1>
        )}
        <Suspense fallback={"Loading..."}>
          <SearchResults page={currentPage} query={query} />
        </Suspense>
      </div>
    </main>
  );
}
