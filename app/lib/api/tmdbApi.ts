import { Genre, MediaCategory, MediaType, TimeWindow } from "../../types/types";

const TMDB_BASE_URL = `${process.env.NEXT_PUBLIC_TMDB_URL}`;
const OMDB_BASE_URL = `${process.env.NEXT_PUBLIC_OMDB_URL}`;
const TMDB_API_KEY = `api_key=${process.env.TMDB_API_KEY}`;
const OMDB_API_KEY = `apikey=${process.env.OMDB_API_KEY}`;

const fetchFromTMDB = async (endpoint: string) => {
  const url = `${TMDB_BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }${TMDB_API_KEY}`;
  try {
    const resp = await fetch(url);

    return resp.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
};
const fetchFromOMDB = async (endpoint: string) => {
  const url = `${OMDB_BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }${OMDB_API_KEY}`;
  try {
    const resp = await fetch(url);

    return resp.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
};

export const fetchResultsByQuery = async (query: string, page?: number) => {
  return fetchFromTMDB(
    `/3/search/multi?query=${query}&page=${page || 1}&language=pl`
  );
};
export const fetchPersonById = async (id: number) => {
  return fetchFromTMDB(`/3/person/${id}?language=pl`);
};
export const fetchPersonCredits = async (id: number) => {
  return fetchFromTMDB(`/3/person/${id}/combined_credits?language=pl`);
};
export const fetchPersonImages = async (id: number) => {
  return fetchFromTMDB(`/3/person/${id}/images?language=pl`);
};
export const fetchMediaList = async (
  mediaType: MediaType,
  category: MediaCategory,
  page?: number
) => {
  return fetchFromTMDB(
    `/3/${mediaType}/${category}?language=pl&page=${page || 1}`
  );
};
export const fetchTrendingList = async (
  mediaType: MediaType,
  timeWindow: TimeWindow,
  page?: number
) => {
  return fetchFromTMDB(
    `/3/trending/${mediaType}/${timeWindow}?language=pl&page=${page || 1}`
  );
};

export const fetchSearchListByFilters = async (
  mediaType: string,
  query: URLSearchParams,
  page?: number,
  sortBy?: string
) => {
  return fetchFromTMDB(
    `/3/discover/${mediaType}?include_adult=true&${
      mediaType === "tv" ? "include_null_first_air_dates=false&" : ""
    }include_video=false&language=pl&page=${page || 1}&sort_by=${
      sortBy ? sortBy : "popularity.desc"
    }${
      query.has("yearFrom")
        ? `&${
            mediaType === "movie"
              ? "primary_release_date.gte"
              : "first_air_date.gte"
          }=${query.get("yearFrom")}-01-01`
        : ""
    }${
      query.has("yearTo")
        ? `&${
            mediaType === "movie"
              ? "primary_release_date.lte"
              : "first_air_date.lte"
          }=${query.get("yearTo")}-12-31`
        : ""
    }${
      query.has("ratingFrom")
        ? `&vote_average.gte=${query.get("ratingFrom")}`
        : ""
    }${
      query.has("ratingTo") ? `&vote_average.lte=${query.get("ratingTo")}` : ""
    }${
      query.has(`${mediaType}-genres`)
        ? `&with_genres=${query.get(`${mediaType}-genres`)}`
        : ""
    }${
      query.has("productionCountry")
        ? `&with_original_language=${query.get("productionCountry")}`
        : ""
    }`
  );
};

export const fetchMovieListByGenre = async (
  genreId: string,
  page: number = 1
) => {
  return fetchFromTMDB(
    `/3/discover/movie?language=pl&include_adult=true&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
  );
};
export const fetchSeriesListByGenre = async (
  genreId: string,
  page: number = 1
) => {
  return fetchFromTMDB(
    `/3/discover/tv?language=pl&include_adult=true&include_null_first_air_dates=false&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
  );
};

export const fetchMediaByID = async (mediaId: string, mediaType: MediaType) => {
  return fetchFromTMDB(`/3/${mediaType}/${mediaId}?language=pl`);
};

export const fetchMovieByIDfromOMDB = async (imdbId: string) => {
  return fetchFromOMDB(`/?i=${imdbId}`);
};

export const fetchSeriesByTitlefromOMDB = async (title: string) => {
  return fetchFromOMDB(`/?t=${title}`);
};

export const getSeasonDetails = async (
  seriesID: number,
  seasonNumber: number
) => {
  return fetchFromTMDB(`/3/tv/${seriesID}/season/${seasonNumber}?language=pl`);
};

export const fetchGenresList = async (): Promise<[Genre[], Genre[]]> => {
  const genresMovies = await fetchFromTMDB(`/3/genre/movie/list?language=pl`);
  const genresTV = await fetchFromTMDB(`/3/genre/tv/list?language=pl`);
  return [genresMovies.genres, genresTV.genres];
};

export const fetchMediaCast = async (mediaId: string, mediaType: MediaType) => {
  return fetchFromTMDB(`/3/${mediaType}/${mediaId}/credits?language=pl`);
};

export const fetchRecommendationsList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  return fetchFromTMDB(
    `/3/${mediaType}/${mediaId}/recommendations?language=pl&page=1`
  );
};

export const fetchUserRecommendationList = async (
  genres: Genre[],
  mediaType: MediaType
) => {
  return fetchFromTMDB(
    `/3/discover/${mediaType}?language=pl&page=1&with_genres=${genres.join(
      ","
    )}`
  );
};

export const fetchSimilarList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  return fetchFromTMDB(`/3/${mediaType}/${mediaId}/similar?language=pl&page=1`);
};

export const fetchVideosList = async (
  mediaId: string,
  mediaType: MediaType
) => {
  return fetchFromTMDB(`/3/${mediaType}/${mediaId}/videos?language=en-US`);
};

export const fetchImages = async (mediaId: string, mediaType: MediaType) => {
  return fetchFromTMDB(
    `/3/${mediaType}/${mediaId}/images?include_image_language=en`
  );
};

export const fetchProviders = async (id: string, mediaType: MediaType) => {
  return fetchFromTMDB(`/3/${mediaType}/${id}/watch/providers`);
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

export async function fetchMoviesAndSeriesData() {
  const results = await Promise.allSettled([
    fetchMediaList("movie", "top_rated", 1),
    fetchMediaList("movie", "popular", 1),
    fetchTrendingList("movie", "week"),
    fetchMediaList("tv", "top_rated", 1),
    fetchMediaList("tv", "popular", 1),
    fetchTrendingList("tv", "week"),
  ]);

  // Obsługa wyników
  const [
    topRatedMovies,
    popularMovies,
    trendingMovies,
    topRatedSeries,
    popularSeries,
    trendingSeries,
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
    topRatedMovies,
    popularMovies,
    trendingMovies,
    topRatedSeries,
    popularSeries,
    trendingSeries,
  };
}
