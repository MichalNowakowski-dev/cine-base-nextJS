"use client";

import { useState } from "react";
import Image from "next/image";
import { ProfileSize } from "@/app/lib/types";

const AvatarPicker = ({ avatarList }: { avatarList: string[] }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // Przechowuje wybrany awatar

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar); // Ustawia wybrany awatar
  };

  const handleAvatarSubmit = () => {
    if (selectedAvatar) {
      alert("Avatar selected successfully!"); // Możesz tu dodać logikę do backendu

      setSelectedAvatar(null);
    }
  };

  const avatarUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.MEDIUM}${path}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Dostępne avatary</h2>

      {/* Sekcja wyświetlania dostępnych awatarów */}
      <div className="grid grid-cols-5 gap-4">
        {avatarList.map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleAvatarSelect(avatar)}
            className={`border-2 rounded-lg p-1 ${
              selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={avatarUrl(avatar)}
              alt={`Avatar ${index + 1}`}
              width={185}
              height={320}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </button>
        ))}
      </div>

      {/* Podgląd wybranego awatara */}
      {selectedAvatar && (
        <div className="flex flex-col items-center">
          <h3 className="text-lg text-gray-600">Selected Avatar:</h3>
          <Image
            src={avatarUrl(selectedAvatar)}
            alt="Selected Avatar"
            width={185}
            height={320}
            className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 mt-4"
          />
        </div>
      )}

      {/* Przycisk zatwierdzania */}
      <button
        onClick={handleAvatarSubmit}
        disabled={!selectedAvatar}
        className={`mt-4 px-6 py-2 rounded bg-blue-600 text-white font-medium ${
          !selectedAvatar
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
      >
        Confirm Avatar
      </button>
    </div>
  );
};

export default AvatarPicker;
