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
