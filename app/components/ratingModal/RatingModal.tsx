import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Modal from "../ui/modal/Modal";

interface RatingModalProps {
  isOpen: boolean;
  currentRating: number;
  onClose: () => void;
  onRatingSubmit: (rating: number) => Promise<void>;
}

const RatingModal = ({
  isOpen,
  onClose,
  onRatingSubmit,
  currentRating,
}: RatingModalProps) => {
  const [rating, setRating] = useState(currentRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async () => {
    return onRatingSubmit(rating);
  };
  const handleStarClick = (rating: number) => {
    setRating(rating);
    setHoveredRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarHoverLeave = () => {
    if (rating) {
      setHoveredRating(rating);
    }
    setHoveredRating(0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-backgroundDashboardCard border border-zinc-700 rounded-lg shadow-xl p-6 flex flex-col items-center">
        <p className="text-zinc-300 text-xl font-semibold mb-4">Wystaw ocenę</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starRating) => (
            <div
              key={starRating}
              onMouseEnter={() => handleStarHover(starRating)}
              onMouseLeave={handleStarHoverLeave}
              onClick={() => handleStarClick(starRating)}
            >
              {hoveredRating >= starRating || rating >= starRating ? (
                <FaStar
                  size={30}
                  color={
                    hoveredRating >= starRating || rating >= starRating
                      ? "#f39c12"
                      : "#ccc"
                  }
                  className="cursor-pointer transition-all duration-200"
                />
              ) : (
                <FaRegStar
                  size={30}
                  color="#ccc"
                  className="cursor-pointer transition-all duration-200"
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-zinc-300 text-sm mt-4">
          {rating
            ? `Oceniłeś na ${rating} ${rating === 1 ? "gwiazdkę" : "gwiazdek"}`
            : "Kliknij na gwiazdy, aby ocenić"}
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
