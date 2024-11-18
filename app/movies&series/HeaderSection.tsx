"use client";

import { useState } from "react";
import { FaThumbsUp, FaRegHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { getImgUrl } from "../lib/utils";
import CtaLink from "../ui/CtaLink";
import Image from "next/image";
import SwitchListButtons from "../ui/SwitchListButtons";

const styles = {
  headerSection:
    "flex flex-col justify-end items-center gap-y-1 h-[50vh] md:h[80vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_70%),_linear-gradient(to_top,_#141414_0%,_transparent_30%)] ",
};

export default function HeaderSection({ list }: { list: any }) {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleSwitchMovie(direction: string) {
    if (
      (activeMovieIndex === 0 && direction === "left") ||
      (activeMovieIndex === list.length - 1 && direction === "right")
    ) {
      return;
    }

    setIsAnimating(true); // Rozpocznij animację
    const offset = direction === "right" ? 1 : -1;

    setTimeout(() => {
      setActiveMovieIndex((prev) => prev + offset);
      setTimeout(() => setIsAnimating(false), 250); // Zakończ animację
    }, 250); // Czas animacji dla znikania
  }

  const { title, name, overview } = list[activeMovieIndex];

  return (
    <section className={styles.headerSection}>
      <Image
        className={`absolute object-cover top-0 left-0 rounded-md -z-10 h-full transition-opacity duration-250 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        alt="movie image"
        src={getImgUrl("original", list[activeMovieIndex].backdrop_path)}
        width={1600}
        height={900}
        priority
      />
      <header
        className={`z-10 text-center transition-opacity duration-250 mb-5 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1>{title || name}</h1>
        <p className="hidden md:block text-white/90 px-20">{overview}</p>
      </header>
      <div className="z-10 mb-14 md:mb-0 flex flex-col md:flex-row gap-3 w-full md:w-auto items-center">
        <CtaLink href="/subscriptions" play className="w-4/5">
          Oglądaj
        </CtaLink>
        <div className="flex gap-x-3 ">
          <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800 hover:text-green-500">
            <FaThumbsUp size={20} />
          </button>
          <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800 hover:text-yellow-500">
            <IoMdAdd size={20} />
          </button>
          <button className="bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800 hover:text-red-500">
            <FaRegHeart size={20} />
          </button>
        </div>
      </div>
      <SwitchListButtons
        className="z-20 w-full bg-transparent justify-between border-none mb-10 "
        activePage={activeMovieIndex + 1}
        maxPageListNumber={list.length}
        handleMoveList={handleSwitchMovie}
      />
    </section>
  );
}
