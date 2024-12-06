"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MediaItem, MediaType } from "@/app/types/types";
import { notifySuccess } from "@/app/lib/toast";
import { addFavorite, removeFavorite } from "@/app/lib/actions";

interface FavoriteButtonProps {
  isFavorite: boolean; // Czy element jest ulubiony
  mediaData: MediaItem;
  mediaType: MediaType;
  userId: number;
}

const FavoriteButton = ({
  isFavorite,
  mediaData,
  mediaType,
  userId,
}: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(mediaData.id, userId, mediaType);
      notifySuccess("Usunięto z ulubionych.");
      setFavorite(false);
    } else {
      await addFavorite(mediaType, mediaData, userId);

      notifySuccess("Dodano do ulubionych.");
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
      {favorite ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
    </button>
  );
};

export default FavoriteButton;
