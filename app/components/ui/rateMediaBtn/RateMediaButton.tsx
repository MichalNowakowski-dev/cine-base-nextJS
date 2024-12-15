"use client";

import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { MediaItem, MediaType } from "@/app/types/types";
import {
  setNewRating,
  removeItemFromUserList,
} from "@/app/lib/actions/media/mediaActions";
import { notifyError, notifyInfo, notifySuccess } from "@/app/lib/toast";
import { useSession } from "next-auth/react";
import RatingModal from "../../ratingModal/RatingModal";

interface RateMediaButtonProps {
  isRated: boolean;
  mediaData: MediaItem;
  mediaType: MediaType;
  rating?: number;
  userId: number;
}

const RateMediaButton = ({
  isRated,
  rating,
  mediaData,
  mediaType,
  userId,
}: RateMediaButtonProps) => {
  const [rated, setRated] = useState(isRated);
  const [showRatingOptions, setShowRatingOptions] = useState(false);
  const { data: session } = useSession();

  const openRatingOptions = () => {
    if (!session?.user) {
      notifyInfo("Zaloguj się aby dodać do listy.");
      return;
    }
    setShowRatingOptions(true);
  };

  useEffect(() => {
    if (showRatingOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showRatingOptions]);

  const handleRatingChange = async (newRating: number) => {
    await setNewRating(mediaType, mediaData, userId, newRating);
    setRated(true);
    setShowRatingOptions(false);
    notifySuccess("Pomyślnie dodano ocenę");
  };

  const handleRatingDelete = async () => {
    try {
      await removeItemFromUserList(mediaData.id, userId, mediaType, "ratings");
      setRated(false);
      notifySuccess("Ocena usunięta pomyślnie");
    } catch (error) {
      console.error(error);
      notifyError("Błąd podczas usuwania oceny");
    } finally {
      setShowRatingOptions(false);
    }
  };

  return (
    <div className="inline-block">
      <button
        aria-label="Rating button"
        onClick={openRatingOptions}
        className={`bg-[#0F0F0F] p-3 rounded-md flex items-center justify-center border border-zinc-800 ${
          rated
            ? "text-green-500 hover:text-white"
            : "text-white hover:text-green-500"
        }`}
      >
        <FaThumbsUp size={25} />
      </button>

      {showRatingOptions && (
        <RatingModal
          isOpen={showRatingOptions}
          currentRating={rating || 0}
          onDelete={handleRatingDelete}
          onClose={() => setShowRatingOptions(false)}
          onRatingSubmit={handleRatingChange}
        />
      )}
    </div>
  );
};

export default RateMediaButton;
