import { IconType } from "react-icons";

export type MediaItem = {
  id: number;
  poster_path: string;
  genre_ids: number[];
  genres?: Genre[];
  title?: string;
  tagline?: string;
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
  imdb_id?: string;
  spoken_languages?: { name: string }[];
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
  media_type: MediaType;
};

export type MediaType = "movie" | "tv" | "person";
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

export type SubscriptionPlan = {
  id: number;
  popular: boolean;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPaymentLink: string;
  yearlyPaymentLink: string;
  monthlyPriceId: string;
  yearlyPriceId: string;
  description: string;
  content: string;
  devicesNumber: number;
  trialPeriod: number;
  cancelAllowed: boolean;
  HDR: boolean;
  DolbyAtmos: boolean;
  adsFree: boolean;
  offlineView: boolean;
  familySharing: boolean;
};

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

export type UserMovieItem = {
  id: number;
  userId: number;
  movieId: number;
};
export type UserShowItem = {
  id: number;
  userId: number;
  showId: number;
};

export type UserRatingMovieItem = UserMovieItem & {
  rating?: number;
};

export type UserRatingShowItem = UserShowItem & {
  rating?: number;
};

export type MediaItemPrisma = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  posterPath: string | null;
  releaseDate?: string | Date;
  firstAirDate?: string | Date;
};
export type RatedMediaItemPrisma = MediaItemPrisma & {
  rating: number;
};

export type PlanDetails = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

export type UserSubscription = {
  id: number;
  stripeSubscriptionId: string | null;
  userId: number;
  planId: number;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  interval: string;
  status: string;
  isPaid: boolean;
  trialPeriod: boolean;
  createdAt: Date;
  updatedAt: Date;
  plan: PlanDetails;
};

export type userInfoProps = {
  favoriteMovies?: UserRatingMovieItem[];
  favoriteShows?: UserRatingShowItem[];
  toWatchMovies?: UserRatingMovieItem[];
  toWatchShows?: UserRatingShowItem[];
};

export type MediaOmdbItem = {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: "True" | "False";
};
