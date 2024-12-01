"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  handleAddToFavorites,
  handleRemoveFromFavorites,
} from "@/app/lib/api/utils";
import { MediaItem, MediaType } from "@/app/lib/types";

interface FavoriteButtonProps {
  isFavorite: boolean; // Czy element jest ulubiony
  mediaData: MediaItem;
  mediaType: MediaType;
}

const FavoriteButton = ({
  isFavorite,
  mediaData,
  mediaType,
}: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async () => {
    if (favorite) {
      await handleRemoveFromFavorites(mediaData.id, mediaType);
      setFavorite(false);
    } else {
      await handleAddToFavorites(mediaData, mediaType);
      setFavorite(true);
    }
  };

  return (
    <button
      aria-label="favorite button"
      onClick={toggleFavorite}
      className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800  ${
        favorite
          ? "text-red-500 hover:text-white"
          : "text-white hover:text-red-500"
      }`}
    >
      {favorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
