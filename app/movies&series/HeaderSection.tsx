"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import CtaLink from "../components/ui/ctaLink/CtaLink";
import { BackdropSize, MediaItem } from "../types/types";

export default function HeaderSection({
  list,
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
    <section className="relative w-full h-[70vh] mb-6 ">
      <Swiper
        modules={[Navigation]}
        loop
        navigation={true}
        pagination={true}
        className="w-full h-full"
      >
        {list.map((movie) => {
          const { title, name, overview, id, backdrop_path } = movie;

          return (
            <SwiperSlide key={id} className="relative w-full h-full ">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${backdrop_path}`}
                alt={title || name || "tło"}
                fill
                quality={100}
                className="absolute object-cover top-0 left-0 w-full h-full z-0"
                priority
              />

              <div className="absolute top-0 left-0 w-full h-full bg-fadeout-bottom flex flex-col justify-end items-center text-center p-5 gap-6 ">
                <h1 className="text-4xl font-bold text-white">
                  {title || name}
                </h1>
                <p className="hidden md:block text-white max-w-[80%] ">
                  {overview}
                </p>
                <div className="grid grid-cols-3 xs:flex  gap-4 mb-4 ">
                  <CtaLink
                    href={
                      title
                        ? `/mediaPlay?movieId=${id}`
                        : `/mediaPlay?seriesId=${id}`
                    }
                    play
                    className="col-span-full "
                  >
                    Oglądaj
                  </CtaLink>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
