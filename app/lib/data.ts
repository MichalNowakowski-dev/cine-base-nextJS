import { Genre, MediaCategory, MediaType, TimeWindow } from "./types";

export const fetchResultsByQuery = async (query: string, page?: number) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/search/multi?query=${query}&page=${
        page || 1
      }&language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    if (!resp.ok) {
      throw new Error("Failed to fetch search results.");
    }

    return resp.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch query results.");
  }
};
export const fetchPersonById = async (id: number) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/person/${id}?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch person details.`);
  }
};
export const fetchPersonCredits = async (id: number) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/person/${id}/combined_credits?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch person credits.`);
  }
};
export const fetchPersonImages = async (id: number) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/person/${id}/images?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch person credits.`);
  }
};
export const fetchMediaList = async (
  mediaType: MediaType,
  category: MediaCategory,
  page?: number
) => {
  try {
    const resp = await fetch(
      `${
        process.env.NEXT_PUBLIC_DB_URL
      }/3/${mediaType}/${category}?language=pl&page=${page || 1}&api_key=${
        process.env.TMDB_API_KEY
      }`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${category} ${mediaType} list.`);
  }
};
export const fetchTrendingList = async (
  mediaType: MediaType,
  timeWindow: TimeWindow,
  page?: number
) => {
  try {
    const resp = await fetch(
      `${
        process.env.NEXT_PUBLIC_DB_URL
      }/3/trending/${mediaType}/${timeWindow}?language=pl&page=${
        page || 1
      }&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch trending ${mediaType} list.`);
  }
};

export const fetchMovieListByGenre = async (
  genreId: string,
  page: number = 1
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/discover/movie?language=pl&include_adult=true&sort_by=popularity.desc&with_genres=${genreId}&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie list by genre.`);
  }
};
export const fetchSeriesListByGenre = async (
  genreId: string,
  page: number = 1
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/discover/tv?language=pl&include_adult=true&include_null_first_air_dates=false&sort_by=popularity.desc&with_genres=${genreId}&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie list by genre.`);
  }
};

export const fetchMediaByID = async (mediaId: string, mediaType: MediaType) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType}.`);
  }
};
export const fetchMovieByIDfromOMDB = async (imdbId: string) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_OMDB_URL}/?i=${imdbId}&apikey=${process.env.OMDB_API_key}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie details from OMDB.`);
  }
};
export const fetchSeriesByTitlefromOMDB = async (title: string) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_OMDB_URL}/?t=${title}&apikey=${process.env.OMDB_API_key}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie details from OMDB.`);
  }
};
export const getSeasonDetails = async (
  seriesID: number,
  seasonNumber: number
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/tv/${seriesID}/season/${seasonNumber}?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie details from OMDB.`);
  }
};

export const fetchGenresList = async (): Promise<[Genre[], Genre[]]> => {
  try {
    const respMovies = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=pl`
    );
    const respTv = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}&language=pl`
    );
    const genresMovies = await respMovies.json();
    const genresTV = await respTv.json();

    return [genresMovies.genres, genresTV.genres];
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch genres lists.`);
  }
};

export const fetchMediaCast = async (mediaId: string, mediaType: MediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}/credits?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} cast.`);
  }
};

export const fetchRecommendationsList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}/recommendations?language=pl&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} cast.`);
  }
};
export const fetchUserRecommendationList = async (
  genres: Genre[],
  mediaType: MediaType
) => {
  try {
    const resp = await fetch(
      `${
        process.env.NEXT_PUBLIC_DB_URL
      }/3/discover/${mediaType}?language=pl&page=1&with_genres=${genres.join(
        ","
      )}&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} cast.`);
  }
};
export const fetchSimilarList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}/similar?language=pl&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} cast.`);
  }
};
export const fetchVideosList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}/videos?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} cast.`);
  }
};

export const fetchImages = async (mediaId: string, mediaType: MediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${mediaId}/images?include_image_language=en&api_key=${process.env.TMDB_API_KEY}`
    );

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} images.`);
  }
};

export const fetchProviders = async (id: string, mediaType: MediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
    );

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ${mediaType} providers.`);
  }
};

export async function fetchMediaData(id: string, type: MediaType) {
  const results = await Promise.allSettled([
    fetchProviders(id, type),
    fetchMediaCast(id, type),
    fetchRecommendationsList(id, type),
    fetchVideosList(id, type),
    fetchImages(id, type),
  ]);

  // Obsługa wyników
  const [
    providers,
    mediaMembers,
    mediaRecommendationsList,
    videoList,
    imagesList,
  ] = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      console.error(`Promise ${index + 1} failed:`, result.reason);
      return null; // Wartość domyślna w przypadku błędu
    }
  });

  // Zwróć dane w formie obiektu
  return {
    providers,
    mediaMembers,
    mediaRecommendationsList,
    videoList,
    imagesList,
  };
}
