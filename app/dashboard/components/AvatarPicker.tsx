"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { notifyError, notifySuccess } from "@/app//lib/toast";
import Spinner from "@/app/components/ui/spinner/Spinner";
import { saveAvatar } from "@/app/lib/actions/user/userActions";

const AvatarPicker = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);
  const { update } = useSession();

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveAvatart = async () => {
    if (selectedAvatar) {
      try {
        setIsChanging(true);
        await saveAvatar(selectedAvatar);
        await update({ user: { image: selectedAvatar } });
        notifySuccess("Avatar zmieniony pomyślnie !");
      } catch (error) {
        console.error(error);
        notifyError("Nie udało się zmienić avataru !");
      } finally {
        setSelectedAvatar(null);
        setIsChanging(false);
      }
    }
  };

  const avatarPath = (avatarNumber: number) => {
    return `/avatars/avatar${avatarNumber}.jpg`;
  };

  return (
    <div className="flex items-center justify-between ">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Dostępne avatary
        </h2>

        {/* Sekcja wyświetlania dostępnych awatarów */}
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((avatar, index) => (
            <button
              key={index}
              onClick={() => handleAvatarSelect(avatarPath(index + 1))}
              className={`border-2 rounded-lg p-1 hover:border-blue-600 ${
                selectedAvatar === avatar
                  ? "border-blue-500"
                  : "border-gray-300"
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
      </div>
      <div>
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
            <button
              onClick={handleSaveAvatart}
              disabled={isChanging}
              className={`mt-4 px-6 py-2 rounded bg-blue-600 text-white font-medium flex items-center gap-3 ${
                isChanging
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isChanging ? "Zmieniam..." : "Zatwierdź"}
              {isChanging && <Spinner size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarPicker;
