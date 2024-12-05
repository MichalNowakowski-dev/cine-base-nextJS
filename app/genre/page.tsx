// app/genres/page.tsx
import {
  fetchMovieListByGenre,
  fetchSeriesListByGenre,
} from "../lib/api/tmdbApi";
import MediaGenreList from "./MediaGenreList";
import Pagination from "./Pagination";
import { MediaType } from "../types/types";

interface GenrePageProps {
  searchParams: Promise<{
    media: MediaType;
    id: string;
    name: string;
    page: string;
  }>;
}

const GenrePage = async ({ searchParams }: GenrePageProps) => {
  const {
    id = "28",
    media = "movie",
    name = "Action",
    page = "1",
  } = await searchParams;
  const currentPage = parseInt(page, 10); // Zamiana na liczbę
  const data =
    media === "movie"
      ? await fetchMovieListByGenre(id, currentPage)
      : await fetchSeriesListByGenre(id, currentPage);

  const mediaList = media === "movie" ? data.results : data.results;

  const totalPages = data.total_pages;

  return (
    <main className="min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl">
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-white">
          {media === "movie" ? `Filmy - ${name}` : `Seriale - ${name}`}
        </h1>
        <MediaGenreList mediaList={mediaList} mediaType={media} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
};

export default GenrePage;
