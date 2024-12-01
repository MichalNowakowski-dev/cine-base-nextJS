"use client";

import { useState } from "react";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "@/app/lib/api/utils";
import { MediaItem, MediaType } from "@/app/lib/types";
import { IoMdAdd } from "react-icons/io";

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  mediaData: MediaItem;
  mediaType: MediaType;
}

const AddToWatchlistButton = ({
  isInWatchlist,
  mediaData,
  mediaType,
}: WatchlistButtonProps) => {
  const [inWatchList, setInWatchlist] = useState(isInWatchlist);

  const toggleFavorite = async () => {
    if (inWatchList) {
      await handleRemoveFromWatchlist(mediaData.id, mediaType);
      setInWatchlist(false);
    } else {
      await handleAddToWatchlist(mediaData, mediaType);
      setInWatchlist(true);
    }
  };

  return (
    <button
      aria-label="favorite button"
      onClick={toggleFavorite}
      className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800  ${
        inWatchList
          ? "text-yellow-500 hover:text-white"
          : "text-white hover:text-yellow-500"
      }`}
    >
      <IoMdAdd />
    </button>
  );
};

export default AddToWatchlistButton;
