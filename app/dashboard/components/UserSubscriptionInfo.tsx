import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

export default function UserSubscriptionInfo({
  session,
}: {
  session: Session;
}) {
  return (
    <div className="bg-backgroundDashboardCard  p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white">Twoje subskrypcje</h2>
      <p className="text-gray-300 mt-2">
        Aktywny plan:{" "}
        <span className="font-bold">{session.user.plan?.name || "Brak"}</span>
      </p>
      <p className="text-gray-300">
        Wygasa:{" "}
        <span className="font-bold">
          {session.user.subscriptionEnd
            ? new Date(session.user.subscriptionEnd as Date).toLocaleDateString(
                "pl-PL",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )
            : "Brak"}
        </span>
      </p>
      <Link
        href={"/dashboard/subscriptions"}
        className="block w-max mt-4 p-2 bg-blue-600 text-white rounded"
      >
        Zarządzaj subskrypcjami
      </Link>
    </div>
  );
}
