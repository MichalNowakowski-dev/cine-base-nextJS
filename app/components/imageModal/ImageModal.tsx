"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";

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
        quality={100}
      />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <Image
            src={imageUrl}
            alt={altText}
            className="rounded-lg max-h-[70vh] w-full object-contain"
            height={height}
            width={width}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageModal;
