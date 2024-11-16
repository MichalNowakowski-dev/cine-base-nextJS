"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ImageModal = ({
  imageUrl,
  altText,
  height,
  width,
}: {
  imageUrl: string;
  altText: string;
  height: number;
  width: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  return (
    <div>
      {/* Miniaturka obrazu */}

      <Image
        src={imageUrl}
        alt={altText}
        className="cursor-pointer w-32 md:w-40 object-cover rounded-lg shadow-lg aspect-video"
        onClick={openModal}
        width={width}
        height={height}
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="relative  rounded-lg shadow-xl max-w-5xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={altText}
              className="rounded-lg max-h-[70vh] w-full object-contain"
              height={height}
              width={width}
            />
            <button
              className="absolute top-4 right-4 text-black text-2xl font-bold bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;
