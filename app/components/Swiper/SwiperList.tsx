"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { MediaType, PosterSize, type MediaItem } from "../../types/types";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { useRef } from "react";
import SwiperNavigationButtons from "./SwiperNavigationButtons";
import MediaRoundedRating from "../ui/mediaRoundedRating/MediaRoundedRating";
import { v4 as uuid } from "uuid";

const SwiperList = ({
  mediaList,
  listLabel,
  mediaType,
  swiperId,
  labelClassName,
}: {
  mediaList: MediaItem[];
  listLabel: string;
  mediaType?: MediaType;
  swiperId: string;
  labelClassName?: string;
}) => {
  const swiperRef = useRef<null>(null);
  const maxSlidesPerView = 6;
  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-2">
        <h3 className={`text-h3 ${labelClassName}`}>{listLabel}</h3>
        {mediaList.length > maxSlidesPerView && (
          <SwiperNavigationButtons swiperId={swiperId} />
        )}
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
        spaceBetween={18}
        className="my-swiper"
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2 },
          480: { slidesPerView: 3, slidesPerGroup: 3 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 4, slidesPerGroup: 4 },
          1080: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={uuid()}>
            <Link
              href={`/${mediaType || item.media_type}/${item.id}`}
              className="relative inline-block group "
            >
              <div className="relative">
                <Image
                  alt="media image"
                  width={185}
                  height={320}
                  quality={100}
                  className="aspect-[2/3] object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:blur-sm"
                  src={
                    item.poster_path
                      ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${item.poster_path}`
                      : "/placeholders/no-poster-img.webp"
                  }
                />
                <MediaRoundedRating
                  rating={item.vote_average}
                  className="absolute bottom-0 right-0"
                />
              </div>
              <div className="absolute rounded-lg inset-0  flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
