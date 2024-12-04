"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { notifySuccess } from "@/app//lib/toast";
import "react-toastify/dist/ReactToastify.css";

const AvatarPicker = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // Przechowuje wybrany awatar
  const { update } = useSession();

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar); // Ustawia wybrany awatar
  };

  const handleAvatarSubmit = async () => {
    if (selectedAvatar) {
      const saveAvatar = await fetch("/api/user/saveAvatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: selectedAvatar }),
      });

      await update({ user: { image: selectedAvatar } });

      if (saveAvatar.ok) {
        notifySuccess("Avatar zmieniony pomyślnie !");
        setSelectedAvatar(null);
      }
    }
  };

  const avatarPath = (avatarNumber: number) => {
    return `/avatars/avatar${avatarNumber}.jpg`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div>
        <ToastContainer theme="dark" autoClose={3000} />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">Dostępne avatary</h2>

      {/* Sekcja wyświetlania dostępnych awatarów */}
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleAvatarSelect(avatarPath(index + 1))}
            className={`border-2 rounded-lg p-1 hover:border-blue-600 ${
              selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={avatarPath(index + 1)}
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
          <h3 className="text-lg text-gray-600">WybierzAvatar:</h3>
          <Image
            src={selectedAvatar}
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
        Zatwierdź
      </button>
    </div>
  );
};

export default AvatarPicker;
