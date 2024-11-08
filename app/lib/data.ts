import {
  MediaCategory,
  MediaType,
  MovieCategory,
  SeriesCategory,
  TimeWindow,
} from "./types";

export const fetchMediaList = async (
  mediaType: MediaType,
  category: MediaCategory
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/${mediaType}/${category}?language=pl&page=1&api_key=${process.env.TMDB_API_KEY}`
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
  timeWindow: TimeWindow
) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/trending/${mediaType}/${timeWindow}?language=pl&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch trending ${mediaType} list.`);
  }
};
export const fetchMovieList = async (category: MovieCategory) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/movie/${category}?language=pl&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie ${category} list.`);
  }
};
export const fetchSeriesList = async (category: SeriesCategory) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/tv/${category}?language=pl&page=1&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie ${category} list.`);
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

export const fetchGenresList = async () => {
  try {
    const respMovies = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=pl`
    );
    const respTv = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}&language=pl`
    );
    const genresMovies = await respMovies.json();
    const genresTV = await respTv.json();

    return [...genresMovies.genres, ...genresTV.genres];
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch genres list.`);
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
