import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function MediaListButton({
  direction,
  handleMove,
}: {
  direction: string;
  handleMove: (direction: string) => void;
}) {
  return (
    <button
      onClick={() => handleMove(direction)}
      className={`absolute hidden top-[45%] ${
        direction === "left" ? "left-2" : "right-2"
      } p-4 bg-[rgba(0,0,0,0.8)] border-none rounded-full translate-y-[-50%] cursor-pointer z-10 md:block`}
    >
      {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );
}
