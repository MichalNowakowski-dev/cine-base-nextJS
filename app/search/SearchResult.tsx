import Image from "next/image";
import Link from "next/link";
import NoPosterImg from "@/public/no-poster-img.webp";
import NoProfileImg from "@/public/no-profile-img.png";
import { getImgUrl } from "../lib/utils";
import { PosterSize, SearchItem } from "../lib/types";

const SearchResult = ({ result }: { result: SearchItem }) => {
  const isPerson = result.media_type === "person";
  const imagePath = isPerson ? result.profile_path : result.poster_path;

  const placeholderImg = isPerson ? NoProfileImg : NoPosterImg;
  const { id, name, title, media_type } = result;

  return (
    <li className="bg-zinc-800 text-white p-4 rounded-lg hover:shadow-lg hover:shadow-white hover:cursor-pointer transition-shadow">
      <Link href={`/${media_type}/${id}`}>
        <Image
          src={
            imagePath
              ? `${getImgUrl(PosterSize.MEDIUM, imagePath)}`
              : placeholderImg
          }
          width={500}
          height={750}
          quality={100}
          alt={name || title || "Brak nazwy"}
          className="rounded-md mb-2  object-contain"
        />
        <h2 className="font-semibold truncate">{title || name}</h2>
        <span className="text-xs text-gray-500 capitalize">
          {result.media_type}
        </span>
      </Link>
    </li>
  );
};

export default SearchResult;
