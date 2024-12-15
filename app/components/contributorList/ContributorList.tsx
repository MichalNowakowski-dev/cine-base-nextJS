import React from "react";
import Image from "next/image";
import { getPersonImagePathFromList } from "@/app/lib/utils";
import { MediaPerson, ProfileSize } from "@/app/types/types";
import NoProfilePicture from "@/public/no-profile-img.png";

export default function ContributorList({
  persons,
  mediaCrew,
}: {
  persons: string;
  mediaCrew: MediaPerson[];
}) {
  return (
    <ul>
      {persons.split(", ").map((person: string) => {
        const personPath = getPersonImagePathFromList(person, mediaCrew);

        return (
          <li
            key={person}
            className="bg-background rounded-md border border-zinc-700 flex gap-2 p-3 "
          >
            <div className="relative h-16 w-16 md:h-20 md:w-20 aspect-square ">
              <Image
                alt="Script person profile"
                src={
                  personPath
                    ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.MEDIUM}${personPath}`
                    : NoProfilePicture
                }
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 70px, (max-width: 1200px) 100px, 120px"
              />
            </div>
            <p className="flex items-center">{person}</p>
          </li>
        );
      })}
    </ul>
  );
}
