import GenreCard from "./GenreCard";

export default function GenresCards({
  genreList,
  className,
}: {
  genreList: { id: number; name: string }[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap justify-between w-full ${className}`}>
      {genreList.map((genre: any) => (
        <GenreCard key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}
