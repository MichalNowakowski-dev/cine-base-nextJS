import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { getImgUrl } from "@/app/lib/utils";

type GenreWithImages = {
  id: number;
  name: string;
  images: string[];
};

export default function GenreCard({
  genre,
  mediaType,
}: {
  genre: GenreWithImages;
  mediaType: string;
}) {
  const { id, name, images } = genre;

  return (
    <li className="bg-backgroundLight rounded-lg p-3 border border-transparent hover:border-zinc-400">
      <Link href={`/genre?media=${mediaType}&name=${name}&id=${id}&page=1`}>
        <ul className="flex flex-wrap w-48 gap-1 mb-2 relative">
          {images.map((path: string) => (
            <li key={path} className="h-20 w-20 relative flex-grow">
              <Image
                className="object-cover rounded-md"
                fill
                sizes="80px"
                src={getImgUrl("w185", path)}
                alt="plakat filmowy"
              />
            </li>
          ))}
          <div className="absolute h-full w-full top-0 left-0 bg-fadeout-bottom z-10 pointer-events-none"></div>
        </ul>
        <div className="flex justify-between">
          <h3>{name}</h3>
          <FaArrowRight size={20} />
        </div>
      </Link>
    </li>
  );
}
