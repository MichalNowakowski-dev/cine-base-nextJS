"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { getImgUrl, moveMediaList } from "../lib/utils";
import NoProfilePicture from "@/public/no-profile-img.png";
import MediaListButton from "./MediaListCarousel/MediaListButton";

export default function CastCarousel({ list }: { list: any }) {
  const listRef = useRef(null);
  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth "
      >
        {list.map((person: any) => (
          <li
            key={person.id + person.profile_path}
            className="flex flex-col flex-shrink-0 cursor-pointer space-y-1"
          >
            <Link
              className="flex flex-col justify-center items-center w-[clamp(6rem,20vw,140px)] "
              href={`/person/${person.id}`}
            >
              <div className="relative mb-2">
                <Image
                  src={
                    person.profile_path
                      ? getImgUrl("w300", person.profile_path)
                      : NoProfilePicture
                  }
                  alt="person image"
                  className="rounded-full object-cover w-full h-auto aspect-square"
                  height={200}
                  width={200}
                />
              </div>
              <h3 className="text-white text-center text-sm font-medium ">
                {person.name}
              </h3>
              <p className="text-gray-400 text-center text-xs">
                {person.character || person.job}
              </p>
            </Link>
          </li>
        ))}
        <MediaListButton
          direction="left"
          handleMove={() => moveMediaList("left", listRef)}
        />
        <MediaListButton
          direction="right"
          handleMove={() => moveMediaList("right", listRef)}
        />
      </ul>
    </div>
  );
}
