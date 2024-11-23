"use client";

import Link from "next/link";

import Image from "next/image";
import { getImgUrl } from "../lib/utils";
import NoProfilePicture from "@/public/no-profile-img.png";
import PaginatedSection from "./PaginatedSection";
import { usePagination } from "../hooks/usePagination";
import { useMemo } from "react";
import { MediaPerson, ProfileSize } from "../lib/types";

const ITEMS_PER_VIEW = 5;
const MAX_ITEMS = 25;

export default function CastCarousel({
  list,
  children,
}: {
  list: MediaPerson[];
  children: React.ReactNode;
}) {
  const slicedList = useMemo(() => list.slice(0, MAX_ITEMS), [list]);

  const {
    activePage,
    maxPageListNumber,
    paginatedList,
    isMobile,
    showList,
    handleMoveList,
  } = usePagination(slicedList, ITEMS_PER_VIEW);

  const castList = isMobile ? slicedList : paginatedList;
  return (
    <>
      <PaginatedSection
        activePage={activePage}
        maxPageListNumber={maxPageListNumber}
        handleMoveList={handleMoveList}
      >
        {children}
      </PaginatedSection>

      <ul
        className={`flex gap-4 overflow-x-auto no-scrollbar scroll-smooth transition-opacity duration-${
          process.env.NEXT_PUBLIC_FADE_TRANSITION_TIME
        } ${showList ? "opacity-100" : "opacity-0"} `}
      >
        {castList.map((person: MediaPerson) => (
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
                      ? getImgUrl(ProfileSize.MEDIUM, person.profile_path)
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
      </ul>
    </>
  );
}
