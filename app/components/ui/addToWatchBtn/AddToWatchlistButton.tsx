"use client";

import { useState } from "react";
import { MediaItem, MediaType } from "@/app/types/types";
import { IoMdAdd } from "react-icons/io";
import {
  addToWatch,
  removeItemFromUserList,
} from "@/app/lib/actions/media/mediaActions";
import { notifyInfo, notifySuccess } from "@/app/lib/toast";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const toggleWatchList = async () => {
    if (!session?.user) return notifyInfo("Zaloguj się aby dodać do listy.");
    if (inWatchList) {
      await removeItemFromUserList(mediaData.id, userId, mediaType, "toWatch");
      notifySuccess("Usunięto z listy do obejrzenia.");
      setInWatchlist(false);
    } else {
      await addToWatch(mediaType, mediaData, userId);

      notifySuccess("Dodano do listy: Do obejrzenia.");
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
