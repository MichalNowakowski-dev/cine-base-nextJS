"use client";

import { useState } from "react";

import { MediaItem, MediaType } from "@/app/types/types";
import { IoMdAdd } from "react-icons/io";
import { addToWatch, removeToWatch } from "@/app/lib/actions";
import { notifySuccess } from "@/app/lib/toast";

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  mediaData: MediaItem;
  mediaType: MediaType;
  userId: number;
}

const AddToWatchlistButton = ({
  isInWatchlist,
  mediaData,
  mediaType,
  userId,
}: WatchlistButtonProps) => {
  const [inWatchList, setInWatchlist] = useState(isInWatchlist);

  const toggleWatchList = async () => {
    if (inWatchList) {
      await removeToWatch(mediaData.id, userId, mediaType);
      notifySuccess("Usunięto z listy do obejrzenia.");
      setInWatchlist(false);
    } else {
      await addToWatch(mediaType, mediaData, userId);

      notifySuccess("Dodano do obejrzenia.");
      setInWatchlist(true);
    }
  };

  return (
    <button
      aria-label="favorite button"
      onClick={toggleWatchList}
      className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800  ${
        inWatchList
          ? "text-yellow-500 hover:text-white"
          : "text-white hover:text-yellow-500"
      }`}
    >
      <IoMdAdd size={25} />
    </button>
  );
};

export default AddToWatchlistButton;
