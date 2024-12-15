"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";

const VideoModal = ({
  videoKey,
  onClose,
}: {
  videoKey: string;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="relative w-full h-[70vh]">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </Modal>
  );
};

export default VideoModal;
