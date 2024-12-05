import Image from "next/image";
import Link from "next/link";
import NoPosterImg from "@/public/no-poster-img.webp";
import NoProfileImg from "@/public/no-profile-img.png";
import { PosterSize, SearchItem } from "../types/types";

const SearchResult = ({ result }: { result: SearchItem }) => {
  const isPerson = result.media_type === "person";
  const imagePath = isPerson ? result.profile_path : result.poster_path;

  const placeholderImg = isPerson ? NoProfileImg : NoPosterImg;
  const { id, name, title, media_type, release_date, first_air_date } = result;

  return (
    <li className="bg-zinc-800 text-white p-4 rounded-lg hover:shadow-lg hover:shadow-white hover:cursor-pointer transition-shadow">
      <Link href={`/${media_type}/${id}`}>
        <Image
          src={
            imagePath
              ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${imagePath}`
              : placeholderImg
          }
          width={500}
          height={750}
          quality={100}
          alt={name || title || "Brak nazwy"}
          className="rounded-md mb-2 aspect-[2/3]"
        />
        <h2 className="font-semibold">{title || name}</h2>
        {first_air_date && (
          <span className="text-sm text-gray-500 capitalize">
            {first_air_date.slice(0, 4)}
          </span>
        )}
        {release_date && (
          <span className="text-sm text-gray-500 capitalize">
            {release_date.slice(0, 4)}
          </span>
        )}
      </Link>
    </li>
  );
};

export default SearchResult;
