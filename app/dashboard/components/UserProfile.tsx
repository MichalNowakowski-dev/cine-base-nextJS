import Link from "next/link";
import React from "react";

export default function UserProfile({
  username,
  userEmail,
}: {
  username?: string;
  userEmail: string;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Twój profil</h2>
      <p className="text-gray-300 mt-2">
        Imię i nazwisko:{" "}
        <span className="font-bold">{username || "Brak danych"}</span>
      </p>
      <p className="text-gray-300">
        Email: <span className="font-bold">{userEmail}</span>
      </p>
      <Link
        href={"/dashboard/profile"}
        className=" block w-max mt-4 p-2 bg-green-600 text-white rounded"
      >
        Edytuj Profil
      </Link>
    </div>
  );
}
