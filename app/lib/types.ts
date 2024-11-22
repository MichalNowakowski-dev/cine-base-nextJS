import { IconType } from "react-icons";

export type MediaItem = {
  id: number;
  poster_path: string;
  genre_ids: number[];
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
};

export type MediaType = "movie" | "tv";
export type MediaCategory = "popular" | "top_rated" | "trending";
export type TimeWindow = "day" | "week";

export enum ImageSize {
  // Poster sizes
  POSTER_SMALL = "w92", // small poster size
  POSTER_MEDIUM = "w185", // medium poster size
  POSTER_LARGE = "w500", // large poster size
  POSTER_XLARGE = "w780", // extra large poster size
  POSTER_ORIGINAL = "original", // original poster size

  // Logo sizes
  LOGO_SMALL = "w45", // small logo size
  LOGO_MEDIUM = "w92", // medium logo size
  LOGO_LARGE = "w154", // large logo size
  LOGO_XLARGE = "w185", // extra large logo size
  LOGO_ORIGINAL = "original", // original logo size

  // Profile sizes
  PROFILE_SMALL = "w45", // small profile size
  PROFILE_MEDIUM = "w185", // medium profile size
  PROFILE_LARGE = "h632", // large profile size
  PROFILE_XLARGE = "original", // extra large profile size

  // Backdrop sizes
  BACKDROP_SMALL = "w300", // small backdrop size
  BACKDROP_MEDIUM = "w780", // medium backdrop size
  BACKDROP_LARGE = "w1280", // large backdrop size
  BACKDROP_XLARGE = "w1920", // extra large backdrop size
  BACKDROP_ORIGINAL = "original", // original backdrop size

  STILL_SMALL = "w92", // small STILL size
  STILL_MEDIUM = "w185", // medium STILL size
  STILL_LARGE = "w300", // large STILL size
}

export type DeviceCardType = {
  name: string;
  Icon: IconType;
  desc: string;
};

export type SeasonItemType = {
  id: number;
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type SubscriptionPlan = {
  id: string;
  popular: boolean;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  content: string;
  devicesNumber: number;
  trialPeriod: number;
  cancelAllowed: string;
  HDR: string;
  DolbyAtmos: string;
  adsFree: string;
  offlineView: string;
  familySharing: string;
};

export type SubscriptionPlanData = Record<string, SubscriptionPlan>;

export type Genre = {
  id: number;
  name: string;
};
export type GenreWithImages = {
  id: number;
  name: string;
  images: string[];
};

export type MediaResponse = {
  results: MediaItem[];
};

export type MediaPerson = {
  id: number;
  name: string;
  character?: string;
  profile_path: string;
  gender: 0 | 1 | 2 | 3;
  known_for_department: string;
  popularity: number;
  original_name: string;
  job?: string;
  department?: string;
};

export type Episode = {
  id: number;
  still_path: string | null;
  name: string;
  overview: string;
  episode_number: number;
  runtime: number | null;
};

export type Season = {
  id: number;
  air_date: string | null;
  _id: number;
  episodes: Episode[];
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};
