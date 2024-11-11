import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function GenresCardListButtons({
  handleMoveList,
  activePage,
  maxPageListNumber,
}: {
  handleMoveList: (direction: string) => void;
  activePage: number;
  maxPageListNumber: number;
}) {
  return (
    <div className="px-4 py-2 bg-backgroundFooter rounded-md flex items-center justify-center gap-3 border border-secondary ">
      <button
        onClick={() => handleMoveList("left")}
        className="p-3 bg-backgroundLight rounded-md flex items-center justify-center"
      >
        <FaArrowLeft />
      </button>
      <ul className="flex gap-[2px] h-full">
        {Array.from({ length: maxPageListNumber }).map((_, i) => (
          <li
            key={i}
            className={`h-[3px] bg-secondary rounded-full ${
              activePage === Number(i) + 1
                ? "bg-red-700 w-4"
                : "bg-secondary w-3"
            } `}
          ></li>
        ))}
      </ul>
      <button
        onClick={() => handleMoveList("right")}
        className="p-3 bg-backgroundLight rounded-md flex items-center justify-center"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
