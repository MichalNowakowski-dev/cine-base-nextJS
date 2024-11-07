export type MediaItem = {
  id: number;
  poster_path: string;
  genre_ids: number[];
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
};

export type MediaType = "movie" | "tv";
export type MediaCategory = "popular" | "top_rated";

export type MovieCategory = "now_playing" | "upcoming";
export type SeriesCategory = "airing_today" | "on_the_air";
