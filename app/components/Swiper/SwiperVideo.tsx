"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import VideoModal from "../videoModal/videoModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import SwiperNavigationButtons from "./SwiperNavigationButtons";
import { PiPlayCircleThin } from "react-icons/pi";
import { v4 as uuid } from "uuid";

const SwiperVideo = ({
  videoList,
  listLabel,
  swiperId,
  labelClassName,
}: {
  videoList: { id: string; key: string; name: string }[];
  listLabel: string;
  swiperId: string;
  labelClassName?: string;
}) => {
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);
  const swiperRef = useRef<null>(null);

  const maxSlidesPerView = 4;

  const openModal = (videoKey: string) => setSelectedVideoKey(videoKey);
  const closeModal = () => setSelectedVideoKey(null);

  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-2">
        <h3 className={`text-h3 ${labelClassName}`}>{listLabel}</h3>
        {videoList.length > maxSlidesPerView && (
          <SwiperNavigationButtons swiperId={swiperId} />
        )}
      </header>
      <Swiper
        ref={swiperRef}
        navigation={{
          nextEl: `#next-${swiperId}`,
          prevEl: `#prev-${swiperId}`,
        }}
        modules={[Navigation, Pagination, FreeMode]}
        pagination={{
          el: `#pagination-${swiperId}`,
          clickable: true,
        }}
        freeMode={true}
        spaceBetween={20}
        className="my-swiper"
        breakpoints={{
          320: { slidesPerView: 1.5, slidesPerGroup: 1.5 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 4, slidesPerGroup: 4 },
          1080: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {videoList.map((video) => {
          const thumbnailSrc = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

          return (
            <SwiperSlide key={uuid()}>
              <div
                onClick={() => openModal(video.key)}
                className="cursor-pointer relative"
              >
                <Image
                  src={thumbnailSrc}
                  alt={`${video.name} thumbnail`}
                  className="rounded-md aspect-video "
                  height={180}
                  width={320}
                />
                <div className="hidden absolute lg:flex items-center justify-center top-0 left-0 h-full w-full rounded-md cursor-pointer hover:bg-black/40 transition-all duration-300 ease-linear group ">
                  <PiPlayCircleThin
                    size={"50%"}
                    className="transition-all duration-300 ease-linear group-hover:rotate-[360deg] group-hover:text-red-700"
                  />
                </div>
              </div>
              <h4 className="text-center mt-2 truncate">{video.name}</h4>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {selectedVideoKey && (
        <VideoModal videoKey={selectedVideoKey} onClose={closeModal} />
      )}
    </div>
  );
};

export default SwiperVideo;
