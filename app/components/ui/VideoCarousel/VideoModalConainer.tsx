"use client";

import { useState, useEffect, useRef } from "react";
import VideoCarousel from "./VideoCarousel";

interface Video {
  id: string;
  key: string;
  name: string;
}

interface VideoModalContainerProps {
  list: Video[];

  children: React.ReactNode;
}

export default function VideoModalContainer({
  list,
  children,
}: VideoModalContainerProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const modalElement = useRef<HTMLDivElement>(null);

  const openModal = (video: Video) => {
    setActiveVideo(video);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalElement.current &&
        !modalElement.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  return (
    <div>
      <VideoCarousel list={list} handleClick={openModal}>
        {children}
      </VideoCarousel>

      {isModalOpen && activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div ref={modalElement} className="relative w-full max-w-3xl p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl font-bold"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
              title={activeVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-[75vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
