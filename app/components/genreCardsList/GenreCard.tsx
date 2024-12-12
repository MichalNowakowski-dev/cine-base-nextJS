import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
// import { getImgUrl } from "@/app/lib/utils";
import { PosterSize } from "@/app/types/types";

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
    <li className="bg-backgroundLight rounded-lg p-3 border border-transparent  hover:border-zinc-400 xs:w-max">
      <Link href={`/genre?media=${mediaType}&name=${name}&id=${id}&page=1`}>
        <ul className="grid grid-cols-2 w-full gap-1 mb-2 relative">
          {images.map((path: string) => (
            <li key={path} className="xs:max-h-24  xs:max-w-24 relative ">
              <Image
                className="object-cover aspect-square rounded-md"
                width={185}
                height={320}
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${path}`}
                alt="poster image"
              />
            </li>
          ))}

          <li className="absolute h-full w-full top-0 left-0 bg-fadeout-bottom z-10 pointer-events-none"></li>
        </ul>
        <div className="flex justify-between">
          <h3>{name}</h3>
          <FaArrowRight size={20} />
        </div>
      </Link>
    </li>
  );
}
