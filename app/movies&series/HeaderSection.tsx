"use client";

import { FaThumbsUp, FaRegHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { getImgUrl } from "../lib/utils";
import CtaLink from "../components/ui/ctaLink/CtaLink";
import Image from "next/image";
import SwitchListButtons from "../components/ui/switchPaginatedListButtons/SwitchPaginatedListButtons";
import { usePagination } from "../hooks/usePagination";
import { BackdropSize, MediaItem } from "../lib/types";

const styles = {
  headerSection:
    "flex flex-col justify-end items-center gap-y-1 h-[50vh] md:h[80vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_70%),_linear-gradient(to_top,_#141414_0%,_transparent_30%)] ",
};

export default function HeaderSection({ list }: { list: MediaItem[] }) {
  const { activePage, showList, handleMoveList } = usePagination(list, 1);

  const { title, name, overview, id } = list[activePage - 1];

  return (
    <section className={styles.headerSection}>
      <Image
        className={`absolute object-cover top-0 left-0 rounded-md -z-10 h-full transition-opacity duration-250 ${
          showList ? "opacity-100" : "opacity-0"
        }`}
        alt="movie image"
        src={getImgUrl(BackdropSize.LARGE, list[activePage - 1].backdrop_path)}
        width={1600}
        height={900}
        priority
      />
      <header
        className={`z-10 text-center transition-opacity duration-250  mb-5 ${
          showList ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1>{title || name}</h1>
        <p className="hidden md:block text-white leading-tight px-20 max-w-full">
          {overview}
        </p>
      </header>
      <div className="z-10 mb-14 md:mb-0 flex flex-col md:flex-row gap-3 w-full md:w-auto items-center">
        <CtaLink
          href={title ? `/movie/${id}` : `/tv/${id}`}
          play
          className="w-4/5"
        >
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
        activePage={activePage}
        maxPageListNumber={list.length}
        handleMoveList={handleMoveList}
      />
    </section>
  );
}
