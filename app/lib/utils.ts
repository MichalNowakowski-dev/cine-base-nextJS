import { MutableRefObject } from "react";
import { ImageSize } from "./types";

export const getImgUrl = (size: ImageSize, path: string) => {
  const IMG_URL = `${process.env.NEXT_PUBLIC_IMAGES_URL}${size}${path}`;
  return IMG_URL;
};

export const moveMediaList = (
  direction: string,
  ref: MutableRefObject<HTMLUListElement | null>
) => {
  if (ref.current) {
    if (direction === "left") {
      ref.current.scrollLeft -= ref.current.offsetWidth;
    } else {
      ref.current.scrollLeft += ref.current.offsetWidth;
    }
  }
};

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours !== 0 ? `${hours}h` : ""} ${remainingMinutes}m`;
}
