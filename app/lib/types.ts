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
  vote_count: number;
};

export type MediaType = "movie" | "tv";
export type MediaCategory = "popular" | "top_rated" | "trending";
export type TimeWindow = "day" | "week";

export enum PosterSize {
  SMALL = "w92", // small poster size
  MEDIUM = "w185", // medium poster size
  LARGE = "w500", // large poster size
  XLARGE = "w780", // extra large poster size
  ORIGINAL = "original", // original poster size
}

export enum LogoSize {
  SMALL = "w92", // medium logo size
  MEDIUM = "w154", // large logo size
  LARGE = "w185", // extra large logo size
  ORIGINAL = "original", // original logo size
}

export enum ProfileSize {
  SMALL = "w45", // small profile size
  MEDIUM = "w185", // medium profile size
  LARGE = "h632", // large profile size
  XLARGE = "original", // extra large profile size
}

export enum BackdropSize {
  SMALL = "w300", // small backdrop size
  MEDIUM = "w780", // medium backdrop size
  LARGE = "w1280", // large backdrop size
  XLARGE = "w1920", // extra large backdrop size
  ORIGINAL = "original", // original backdrop size
}

export enum StillSize {
  SMALL = "w92", // small still size
  MEDIUM = "w185", // medium still size
  LARGE = "w300", // large still size
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
