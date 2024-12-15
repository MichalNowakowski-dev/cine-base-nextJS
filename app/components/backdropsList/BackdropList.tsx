import React from "react";
import ImageModal from "../imageModal/ImageModal";
import { BackdropSize } from "@/app/types/types";
type ImageListItem = {
  file_path: string;
  height: number;
  width: number;
};

export default function BackdropList({
  list,
  className,
}: {
  list: ImageListItem[];
  className?: string;
}) {
  return (
    <ul
      className={`grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 ${className}`}
    >
      {list ? (
        list.slice(0, 14).map((img: ImageListItem) => (
          <li className=" hover:cursor-pointer" key={img.file_path}>
            <ImageModal
              altText="backdrop image"
              imageUrl={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${img.file_path}`}
              height={img.height}
              width={img.width}
            />
          </li>
        ))
      ) : (
        <p className="text-secondary">Brak dostępnych teł</p>
      )}
    </ul>
  );
}
