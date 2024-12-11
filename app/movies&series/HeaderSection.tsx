"use client";

import CtaLink from "../components/ui/ctaLink/CtaLink";
import Image from "next/image";
import SwitchListButtons from "../components/ui/switchPaginatedListButtons/SwitchPaginatedListButtons";
import { usePagination } from "../hooks/usePagination";
import { BackdropSize, MediaItem } from "../types/types";
import { styles } from "../styles";
import RateMediaButton from "@/app/components/ui/rateMediaBtn/RateMediaBtn";
import AddToWatchlistButton from "../components/ui/addToWatchBtn/AddToWatchlistButton";
import FavoriteButton from "../components/ui/addToFavBtn/AddToFavoriteBtn";

export default function HeaderSection({
  list,
  userListsStatus,
  userId,
}: {
  list: MediaItem[];
  userListsStatus: {
    favoriteStatus: boolean;
    watchlistStatus: boolean;
    ratingStatus: number | null;
  }[];
  userId: number;
}) {
  const { activePage, showList, handleMoveList } = usePagination(list, 1);

  const { title, name, overview, id } = list[activePage - 1];
  const { ratingStatus, watchlistStatus, favoriteStatus } =
    userListsStatus[activePage - 1];

  const activeMovie = list[activePage - 1];

  return (
    <section className={styles.headerSection}>
      <Image
        className={`absolute object-cover top-0 left-0 rounded-md -z-10 h-full transition-opacity duration-250 ${
          showList ? "opacity-100" : "opacity-0"
        }`}
        alt="movie image"
        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${activeMovie.backdrop_path}`}
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
          href={
            title ? `/mediaPlay?movieId=${id}` : `/mediaPlay?seriesId=${id}`
          }
          play
          className="w-4/5"
        >
          Oglądaj
        </CtaLink>
        <div className="flex gap-x-3">
          <RateMediaButton
            isRated={Boolean(ratingStatus)}
            mediaData={activeMovie}
            mediaType="movie"
            rating={ratingStatus as number}
            userId={userId}
          />
          <AddToWatchlistButton
            isInWatchlist={watchlistStatus}
            mediaData={activeMovie}
            mediaType="movie"
            userId={userId}
          />
          <FavoriteButton
            userId={userId}
            isFavorite={favoriteStatus}
            mediaData={activeMovie}
            mediaType="movie"
          />
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
