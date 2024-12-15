import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SwiperNavigationButtons({
  swiperId,
}: {
  swiperId: string;
}) {
  return (
    <div className="hidden min-w-48 w-max lg:flex px-4 py-2 bg-backgroundFooter rounded-md items-center justify-between gap-3 border border-borderPrimary">
      <button
        aria-label="Przewiń listę w lewo"
        id={`prev-${swiperId}`}
        className="custom-prev"
      >
        <FaArrowLeft />
      </button>
      <div
        id={`pagination-${swiperId}`}
        className="custom-pagination h-full items-center justify-center flex gap-x-[2px] "
      ></div>
      <button
        aria-label="Przewiń listę w prawo"
        id={`next-${swiperId}`}
        className="custom-next"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
