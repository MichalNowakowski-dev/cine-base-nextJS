import Image from "next/image";
import Link from "next/link";
import NoPosterImg from "@/public/placeholders/no-poster-img.webp";
import NoProfileImg from "@/public/placeholders/no-profile-img.png";
import { PosterSize, SearchItem } from "../types/types";

const SearchResult = ({
  result,
  mediaType,
}: {
  result: SearchItem;
  mediaType: string;
}) => {
  const isPerson = result.media_type === "person";
  const imagePath = isPerson ? result.profile_path : result.poster_path;

  const placeholderImg = isPerson ? NoProfileImg : NoPosterImg;
  const { id, name, title, release_date, first_air_date, media_type } = result;

  return (
    <li className=" text-white p-4 rounded-lg hover:scale-105 hover:cursor-pointer transition-transform duration-100">
      <Link href={`/${mediaType || media_type}/${id}`}>
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
          className="rounded-md mb-2 aspect-[2/3] object-cover"
        />
        <h2 className="font-semibold truncate">{title || name}</h2>
        {first_air_date && (
          <span className="text-sm text-gray-500 capitalize ">
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
