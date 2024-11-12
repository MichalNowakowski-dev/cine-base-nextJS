import GenreCard from "./GenreCard";

export default function GenresCards({
  genreList,
  className,
}: {
  genreList: { id: number; name: string }[];
  className?: string;
}) {
  return (
    <ul
      className={`flex gap-3 justify-between min-w-full overflow-x-auto md:overflow-hidden  ${className}`}
    >
      {genreList.map((genre: any) => (
        <GenreCard key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}
