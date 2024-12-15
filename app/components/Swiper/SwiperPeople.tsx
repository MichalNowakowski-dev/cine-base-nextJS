"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MediaPerson, ProfileSize } from "../../types/types";
import Image from "next/image";
import Link from "next/link";
import SwiperNavigationButtons from "./SwiperNavigationButtons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { v4 as uuid } from "uuid";

const SwiperPeople = ({
  personList,
  listLabel,
  swiperId,
  labelClassName,
}: {
  personList: MediaPerson[];
  listLabel: string;
  swiperId: string;
  labelClassName?: string;
}) => {
  const swiperRef = useRef<null>(null);

  const maxSlidesPerView = 6;

  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-2">
        <h3 className={`text-h3 ${labelClassName}`}>{listLabel}</h3>
        {personList.length > maxSlidesPerView && (
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
        className="my-swiper"
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2 },
          480: { slidesPerView: 3, slidesPerGroup: 3 },
          640: { slidesPerView: 4, slidesPerGroup: 4 },
          768: { slidesPerView: 5, slidesPerGroup: 5 },
          1080: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
      >
        {personList.map((person) => (
          <SwiperSlide key={uuid()}>
            <Link href={`/person/${person.id}`}>
              <div className="relative block group">
                <Image
                  alt="media image"
                  width={185}
                  height={320}
                  quality={100}
                  className="aspect-square rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:blur-sm"
                  src={
                    person.profile_path
                      ? `${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.MEDIUM}${person.profile_path}`
                      : "/no-profile-img.png"
                  }
                />
                <div className="absolute rounded-full inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold text-center">
                    {person.name}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-white text-center text-sm font-medium ">
                  {person.name}
                </h3>
                <p className="text-gray-400 text-center text-xs">
                  {person.character || person.job}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperPeople;
