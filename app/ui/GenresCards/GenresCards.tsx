import { GenreWithImages, MediaType } from "@/app/lib/types";
import GenreCard from "./GenreCard";
import { v4 as uuidv4 } from "uuid";

export default function GenresCards({
  genreList,
  className,
  mediaType,
}: {
  genreList: GenreWithImages[];
  className?: string;
  mediaType: MediaType;
}) {
  return (
    <ul
      className={`flex gap-3 justify-between min-w-full overflow-x-auto no-scrollbar lg:overflow-hidden ${className}`}
    >
      {genreList.map((genre: GenreWithImages) => (
        <GenreCard key={uuidv4()} genre={genre} mediaType={mediaType} />
      ))}
    </ul>
  );
}
