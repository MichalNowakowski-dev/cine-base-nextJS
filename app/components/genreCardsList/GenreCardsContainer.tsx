import {
  MediaType,
  Genre,
  MediaResponse,
  GenreWithImages,
} from "@/app/types/types";
import {
  fetchGenresList,
  fetchMovieListByGenre,
  fetchSeriesListByGenre,
} from "@/app/lib/api/tmdbApi";
import SwiperGenres from "../Swiper/SwiperGenres";

async function getGenresWithImages(
  mediaType: MediaType
): Promise<GenreWithImages[]> {
  const [moviesGenres, seriesGenres] = await fetchGenresList();

  const genres: Genre[] = mediaType === "movie" ? moviesGenres : seriesGenres;

  const genresWithImages = await Promise.all(
    genres.map(async (genre) => {
      const media: MediaResponse =
        mediaType === "movie"
          ? await fetchMovieListByGenre(String(genre.id))
          : await fetchSeriesListByGenre(String(genre.id));

      const images: string[] = media.results
        .filter((mediaItem) => mediaItem.poster_path)
        .slice(0, 4)
        .map((mediaItem) => mediaItem.poster_path as string);

      return { ...genre, images };
    })
  );

  return genresWithImages;
}

export default async function GenreCardsContainer({
  mediaType,
  children,
  swiperId,
}: {
  mediaType: MediaType;
  children: React.ReactNode;
  swiperId: string;
}) {
  const genresListWithImages = await getGenresWithImages(mediaType);
  return (
    <SwiperGenres
      genreList={genresListWithImages}
      swiperId={swiperId}
      mediaType={mediaType}
    >
      {children}
    </SwiperGenres>
  );
}
