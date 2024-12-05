"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { MediaType, PosterSize, type MediaItem } from "../../lib/types";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { useRef } from "react";
import SwiperNavigationButtons from "./SwiperNavigationButtons";

const SwiperList = ({
  mediaList,
  listLabel,
  mediaType,
  swiperId,
}: {
  mediaList: MediaItem[];
  listLabel: string;
  mediaType: MediaType;
  swiperId: number;
}) => {
  const swiperRef = useRef<null>(null);
  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-6">
        <h3 className="text-h3">{listLabel}</h3>
        <SwiperNavigationButtons swiperId={swiperId} />
      </header>
      <Swiper
        ref={swiperRef}
        navigation={{
          nextEl: `#next-${swiperId}`,
          prevEl: `#prev-${swiperId}`,
        }}
        modules={[Navigation, Pagination]}
        pagination={{
          el: `#pagination-${swiperId}`,
          clickable: true,
        }}
        className="my-swiper"
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 30 },
          480: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 35 },
          640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 40 },
          768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          1080: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 80 },
        }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={`/${mediaType}/${item.id}`}
              className="relative block group"
            >
              <Image
                alt="media image"
                width={185}
                height={320}
                quality={100}
                className="aspect-[2/3] rounded-lg transition-transform duration-300 ease-in-out group-hover:blur-sm"
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${item.poster_path}`}
              />
              <div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold text-center">
                  {item.title || item.name}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperList;
