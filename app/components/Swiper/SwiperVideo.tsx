"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import VideoModal from "../videoModal/videoModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import SwiperNavigationButtons from "./SwiperNavigationButtons";

const SwiperVideo = ({
  videoList,
  listLabel,
  swiperId,
}: {
  videoList: { id: string; key: string; name: string }[];
  listLabel: string;
  swiperId: string;
}) => {
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);
  const swiperRef = useRef<null>(null);

  const openModal = (videoKey: string) => setSelectedVideoKey(videoKey);
  const closeModal = () => setSelectedVideoKey(null);

  return (
    <div className="relative">
      <header className="flex justify-between items-center mb-6">
        <h3 className="text-h3 ">{listLabel}</h3>
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
          1080: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {videoList.map((video) => {
          const thumbnailSrc = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

          return (
            <SwiperSlide key={video.id}>
              <div
                onClick={() => openModal(video.key)}
                className="cursor-pointer"
              >
                <Image
                  src={thumbnailSrc}
                  alt={`${video.name} thumbnail`}
                  className="rounded-md aspect-video"
                  height={180}
                  width={320}
                />
                <h4 className="text-center mt-2 truncate">{video.name}</h4>
              </div>
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
