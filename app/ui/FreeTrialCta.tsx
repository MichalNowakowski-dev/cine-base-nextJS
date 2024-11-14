import React from "react";
import { fetchMediaList } from "../lib/data";
import { getImgUrl } from "../lib/utils";
import Image from "next/image";

export default async function FreeTrialCta() {
  const movies = await fetchMediaList("movie", "top_rated");
  const images = await movies.results.map((movie: any) => {
    return movie.poster_path;
  });

  return (
    <div
      className={`px-4 py-8 border border-[#262626] rounded-md text-center md:text-left md:flex md:justify-between md:items-center relative overflow-hidden `}
    >
      <header className="flex flex-wrap gap-4 mb-5 md:basis-2/3">
        <h3 className="text-h3">Zacznij darmowy okres próbny już dziś!</h3>
        <p className="text-sm text-secondary">
          Dołącz do CineBase i odkryj bogatą bibliotekę filmów, seriali oraz
          unikalnych treści, które masz zawsze pod ręką. Dzięki bezpłatnemu
          okresowi próbnemu możesz bez zobowiązań sprawdzić, co dla Ciebie
          przygotowaliśmy
        </p>
      </header>

      <button className=" px-6 basis-1/2 md:basis-[20%] py-3 bg-primary rounded-md border-[#262626] border">
        Wypróbuj teraz!
      </button>

      <div className=" absolute w-full h-full top-0 left-0 bg-fade-top-black-bottom-red md:bg-fade-black-to-red-cta -z-10"></div>

      <ul className="grid grid-cols-3 gap-3 -z-20 absolute top-0 left-0 w-full md:grid-cols-10 h-full place-items-center">
        {images.map((path: string) => (
          <li key={path}>
            <Image
              width={125}
              height={74}
              alt="poster image"
              src={getImgUrl("w185", path)}
              className="object-cover md:aspect-video"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
