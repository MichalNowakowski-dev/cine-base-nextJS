"use client";

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { handleAddOrUpdateRating } from "@/app/lib/api/utils";
import { MediaItem, MediaType } from "@/app/lib/types";

interface RateMediaButtonProps {
  isRated: boolean; // Czy element jest oceniony
  mediaData: MediaItem;
  mediaType: MediaType;
  rating?: number; // Ocena już przypisana (jeśli istnieje)
}

const RateMediaButton = ({
  isRated,
  rating,
  mediaData,
  mediaType,
}: RateMediaButtonProps) => {
  const [rated, setRated] = useState(isRated);
  const [selectedRating, setSelectedRating] = useState(rating || 0); // stan oceny użytkownika
  const [showRatingOptions, setShowRatingOptions] = useState(false); // stan pokazania opcji oceny

  // Funkcja do toggle'owania oceniania
  const toggleRating = () => {
    setShowRatingOptions(!showRatingOptions); // Pokaż opcje oceny
  };

  // Funkcja do aktualizacji oceny
  const handleRatingChange = (newRating: number) => {
    setSelectedRating(newRating); // Zaktualizuj ocenę
    handleAddOrUpdateRating(mediaData, mediaType, newRating);
    setRated(true);
    setShowRatingOptions(false);
  };

  return (
    <div>
      <button
        aria-label="Rating button"
        onClick={toggleRating}
        className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800  ${
          rated
            ? "text-green-500 hover:text-white"
            : "text-white hover:text-green-500"
        }`}
      >
        <FaThumbsUp size={25} />
      </button>

      {/* Opcje oceniania */}
      {showRatingOptions && (
        <div className="mt-2 flex space-x-2 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ratingOption) => (
            <button
              key={ratingOption}
              onClick={() => handleRatingChange(ratingOption)}
              className={`p-2 rounded-md hover:scale-105 hover:bg-green-800 ${
                selectedRating === ratingOption
                  ? "bg-green-500 text-white"
                  : "bg-zinc-800 text-white"
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
