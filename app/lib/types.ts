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
export type MediaCategory = "popular" | "top_rated" | "trending";
export type TimeWindow = "day" | "week";

export type MovieCategory = "now_playing" | "upcoming";
export type SeriesCategory = "airing_today" | "on_the_air";

export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type LogoSize =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w500"
  | "original";
export type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";
export type ProfileSize = "w45" | "w185" | "h632" | "original";

export type ImageSize = BackdropSize | LogoSize | PosterSize | ProfileSize;

export type MediaListContainerProps = {
  timeWindow?: TimeWindow;
  mediaCategory?: MediaCategory;
  movieCategories?: [MovieCategory, MovieCategory];
  seriesCategories?: [SeriesCategory, SeriesCategory];
  label: string;
  switchNames: [string, string];
};
