// GenresCardsSectionContainer.js (Server Component)
import { MediaType } from "@/app/lib/types";
import GenresCardsSection from "./GenresCardsSection";
import {
  fetchGenresList,
  fetchMovieListByGenre,
  fetchSeriesListByGenre,
} from "@/app/lib/data";

async function getGenresWithImages(mediaType: MediaType) {
  const [moviesGenres, seriesGenres] = await fetchGenresList();
  const genres = mediaType === "movie" ? moviesGenres : seriesGenres;

  const genresWithImages = await Promise.all(
    genres.map(async (genre: any) => {
      const media =
        mediaType === "movie"
          ? await fetchMovieListByGenre(genre.id)
          : await fetchSeriesListByGenre(genre.id);
      const images = media.results
        .slice(0, 4)
        .map((media: any) => media.poster_path);
      return { ...genre, images };
    })
  );

  return genresWithImages;
}

export default async function GenresCardsSectionContainer() {
  const genresListWithImages = await getGenresWithImages("movie");
  return <GenresCardsSection genresList={genresListWithImages} />;
}
