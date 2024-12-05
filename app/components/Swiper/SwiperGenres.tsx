"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { GenreWithImages, MediaType } from "../../types/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { useRef } from "react";
import SwiperNavigationButtons from "./SwiperNavigationButtons";
import { v4 as uuid } from "uuid";
import GenreCard from "../genreCardsList/GenreCard";

const SwiperList = ({
  genreList,
  children,
  mediaType,
  swiperId,
}: {
  genreList: GenreWithImages[];
  children: React.ReactNode;
  mediaType: MediaType;
  swiperId: string;
}) => {
  const swiperRef = useRef<null>(null);
  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-6">
        {children}
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
        spaceBetween={20}
        className="my-swiper"
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2 },
          480: { slidesPerView: 3, slidesPerGroup: 3 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 4, slidesPerGroup: 4 },
          1080: { slidesPerView: 5, slidesPerGroup: 5 },
        }}
      >
        {genreList.map((genre: GenreWithImages) => (
          <SwiperSlide key={genre.id}>
            <GenreCard key={uuid()} genre={genre} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperList;
