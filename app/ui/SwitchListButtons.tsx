import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SwitchListButtons({
  handleMoveList,
  activePage,
  maxPageListNumber,
  className,
}: {
  handleMoveList: (directlyTo: number) => void;
  activePage: number;
  maxPageListNumber: number;
  className?: string;
}) {
  return (
    <div
      className={`hidden lg:flex px-4 py-2 bg-backgroundFooter rounded-md items-center justify-center gap-3 border border-borderPrimary ${
        className && className
      }`}
    >
      <button
        onClick={() => handleMoveList(activePage - 1)}
        aria-label="previous button"
        className="p-3 bg-backgroundLight hover:bg-background rounded-md flex items-center justify-center border border-borderPrimary"
      >
        <FaArrowLeft />
      </button>
      <ul className="flex items-center gap-[2px] h-full">
        {Array.from({ length: maxPageListNumber }).map((_, i) => (
          <li
            key={i}
            onClick={() => handleMoveList(Number(i) + 1)}
            className={`h-[3px] rounded-full hover:cursor-pointer ${
              activePage === Number(i) + 1
                ? "bg-red-600 w-4"
                : "bg-secondary w-3"
            } `}
          ></li>
        ))}
      </ul>
      <button
        onClick={() => handleMoveList(activePage + 1)}
        aria-label="next button"
        className="p-3 bg-backgroundLight hover:bg-background rounded-md flex items-center justify-center border border-borderPrimary"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
