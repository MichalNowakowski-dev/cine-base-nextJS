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
  media_type?: string;
  character?: string;
  job?: string;
};
export type SearchItem = {
  id: number;
  poster_path?: string | null;
  profile_path?: string | null;
  genre_ids?: number[];
  name?: string;
  title?: string;
  overview: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  popularity?: string;
  vote_average: number;
  vote_count: number;
  media_type: MediaType | "person";
};

export type MediaType = "movie" | "tv";
export type MediaCategory = "popular" | "top_rated" | "trending";
export type TimeWindow = "day" | "week";

export enum PosterSize {
  SMALL = "w92",
  MEDIUM = "w185",
  LARGE = "w500",
  XLARGE = "w780",
  ORIGINAL = "original",
}

export enum LogoSize {
  SMALL = "w92",
  MEDIUM = "w154",
  LARGE = "w185",
  ORIGINAL = "original",
}

export enum ProfileSize {
  XSMALL = "w45",
  SMALL = "w92",
  MEDIUM = "w185",
  LARGE = "h632",
  XLARGE = "original",
}

export enum BackdropSize {
  SMALL = "w300",
  MEDIUM = "w780",
  LARGE = "w1280",
  XLARGE = "w1920",
  ORIGINAL = "original",
}

export enum StillSize {
  SMALL = "w92",
  MEDIUM = "w185",
  LARGE = "w300",
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
