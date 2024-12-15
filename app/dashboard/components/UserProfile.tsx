import { FormStyles } from "@/app/styles";
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
    <div className="bg-backgroundDashboardCard p-6 rounded-lg shadow-md flex flex-col gap-5 justify-between">
      <h2 className="text-xl font-semibold text-white">Twój profil</h2>
      <div>
        <p className="text-gray-300 ">
          Imię i nazwisko:{" "}
          <span className="font-bold">{username || "Brak danych"}</span>
        </p>
        <p className="text-gray-300">
          Email: <span className="font-bold">{userEmail}</span>
        </p>
      </div>
      <Link href={"/dashboard/profile"} className={FormStyles.submitButton}>
        Edytuj Profil
      </Link>
    </div>
  );
}
