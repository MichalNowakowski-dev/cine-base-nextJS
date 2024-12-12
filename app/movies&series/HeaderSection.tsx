"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import CtaLink from "../components/ui/ctaLink/CtaLink";
import { BackdropSize, MediaItem } from "../types/types";
import RateMediaButton from "../components/ui/rateMediaBtn/RateMediaButton";
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
  return (
    <section className="relative w-full h-[70vh] mb-6">
      <Swiper
        modules={[Navigation]}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {list.map((movie, index) => {
          const { title, name, overview, id, backdrop_path } = movie;
          const { favoriteStatus, watchlistStatus, ratingStatus } =
            userListsStatus[index];

          return (
            <SwiperSlide key={id} className="relative w-full h-full ">
              {/* Background Image */}
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${backdrop_path}`}
                alt={title || name || "tło"}
                fill
                className="absolute object-cover top-0 left-0 w-full h-full z-0"
                priority
              />
              {/* Content Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-fadeout-bottom flex flex-col justify-end items-center text-center p-5 gap-6 ">
                <h1 className="text-4xl font-bold text-white">
                  {title || name}
                </h1>
                <p className="hidden md:block text-white max-w-[80%] ">
                  {overview}
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4 ">
                  <CtaLink
                    href={
                      title
                        ? `/mediaPlay?movieId=${id}`
                        : `/mediaPlay?seriesId=${id}`
                    }
                    play
                  >
                    Oglądaj
                  </CtaLink>
                  <RateMediaButton
                    isRated={Boolean(ratingStatus)}
                    mediaData={movie}
                    mediaType="movie"
                    rating={ratingStatus as number}
                    userId={userId}
                  />
                  <AddToWatchlistButton
                    isInWatchlist={watchlistStatus}
                    mediaData={movie}
                    mediaType="movie"
                    userId={userId}
                  />
                  <FavoriteButton
                    userId={userId}
                    isFavorite={favoriteStatus}
                    mediaData={movie}
                    mediaType="movie"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
