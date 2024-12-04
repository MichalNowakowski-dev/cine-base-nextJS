"use client";

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { handleAddOrUpdateRating } from "@/app/lib/api/userApi";
import { MediaItem, MediaType } from "@/app/lib/types";

interface RateMediaButtonProps {
  isRated: boolean;
  mediaData: MediaItem;
  mediaType: MediaType;
  rating?: number;
}

const RateMediaButton = ({
  isRated,
  rating,
  mediaData,
  mediaType,
}: RateMediaButtonProps) => {
  const [rated, setRated] = useState(isRated);
  const [selectedRating, setSelectedRating] = useState(rating || 0);
  const [showRatingOptions, setShowRatingOptions] = useState(false);

  const toggleRatingOptions = () => {
    setShowRatingOptions((prev) => !prev);
  };

  const handleRatingChange = async (newRating: number) => {
    await handleAddOrUpdateRating(mediaData, mediaType, newRating);
    setSelectedRating(newRating);
    setRated(true);
    setShowRatingOptions(false);
  };

  return (
    <div className="relative inline-block">
      <button
        aria-label="Rating button"
        onClick={toggleRatingOptions}
        className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800 ${
          rated
            ? "text-green-500 hover:text-white"
            : "text-white hover:text-green-500"
        }`}
      >
        <FaThumbsUp size={25} />
      </button>

      {showRatingOptions && (
        <div className="absolute top-full mt-2 bg-[#1a1a1a] border border-zinc-700 rounded-md shadow-md p-3 flex space-x-2 z-50">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ratingOption) => (
            <button
              key={ratingOption}
              onClick={() => handleRatingChange(ratingOption)}
              className={`p-2 w-8 h-8 rounded-md flex items-center justify-center transition-transform transform hover:scale-110 ${
                selectedRating === ratingOption
                  ? "bg-green-500 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-green-800"
              }`}
            >
              {ratingOption}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateMediaButton;
