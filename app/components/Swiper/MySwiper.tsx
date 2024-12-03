"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";

// import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { PosterSize, type MediaItem } from "../../lib/types";

// Aktywuj wymagane moduły

const MySwiperComponent = ({ mediaList }: { mediaList: MediaItem[] }) => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={5}
        pagination={{ clickable: true }}
        className="my-swiper"
        slidesPerGroup={5}
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 5, slidesPerGroup: 5 },
          1440: { slidesPerView: 5, slidesPerGroup: 5 },
        }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={item.id} className="flex! justify-center!">
            <Image
              alt="media image"
              width={185}
              height={320}
              quality={100}
              className="aspect-[2/3]"
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${PosterSize.MEDIUM}${item.poster_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MySwiperComponent;
