"use client";

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { MediaItem, MediaType } from "@/app/types/types";
import {
  setNewRating,
  removeItemFromUserList,
} from "@/app/lib/actions/media/mediaActions";
import { notifyError, notifyInfo, notifySuccess } from "@/app/lib/toast";
import { useSession } from "next-auth/react";
import Modal from "../modal/Modal";

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
  const [selectedRating, setSelectedRating] = useState(rating || 0);
  const [showRatingOptions, setShowRatingOptions] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();

  const openRatingOptions = () => {
    if (!session?.user) {
      notifyInfo("Zaloguj się aby dodać do listy.");
      return;
    }
    setShowRatingOptions(true);
  };

  const handleRatingChange = async (newRating: number) => {
    setIsPending(true);
    await setNewRating(mediaType, mediaData, userId, newRating);
    setSelectedRating(newRating);
    setRated(true);
    setShowRatingOptions(false);
    setIsPending(false);
    notifySuccess("Pomyślnie dodano ocenę");
  };

  const handleRatingDelete = async () => {
    setIsPending(true);
    try {
      await removeItemFromUserList(mediaData.id, userId, mediaType, "ratings");
      setRated(false);
      notifySuccess("Ocena usunięta pomyślnie");
    } catch (error) {
      console.error(error);
      notifyError("Błąd podczas usuwania oceny");
    } finally {
      setIsPending(false);
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
        <Modal
          isOpen={showRatingOptions}
          onClose={() => setShowRatingOptions(false)}
          className="!max-w-screen bg-transparent"
        >
          <div className="bg-backgroundDashboardCard border border-zinc-700 rounded-lg shadow-xl p-4 flex flex-col space-y-4 items-center">
            <p className="text-zinc-300 text-sm font-medium">Twoja ocena:</p>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ratingOption) => (
                <button
                  key={ratingOption}
                  disabled={isPending}
                  onClick={() => handleRatingChange(ratingOption)}
                  className={`p-3 w-10 h-10 text-sm font-bold rounded-full flex items-center justify-center transition-all transform hover:scale-110  disabled:cursor-not-allowed ${
                    selectedRating === ratingOption
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-transparent text-zinc-300 hover:bg-green-800 hover:text-white"
                  }`}
                  aria-label={`Rate ${ratingOption}`}
                >
                  {ratingOption}
                </button>
              ))}
            </div>
            {rated && (
              <button
                onClick={handleRatingDelete}
                className="p-3 text-sm font-medium rounded-md flex items-center justify-center bg-red-500 text-white hover:bg-red-700 transition-all duration-200"
                aria-label="Delete rating"
              >
                Usuń ocenę
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RateMediaButton;
