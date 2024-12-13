"use client";
import { UserSubscription } from "@/app/types/types";
import { useState } from "react";

export default function SubscriptionHistory({
  subscriptionHistoryList,
}: {
  subscriptionHistoryList: UserSubscription[];
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full  mx-auto">
      <h2 className="text-2xl font-bold mb-4">Historia Subskrypcji</h2>
      <ul className="space-y-4">
        {subscriptionHistoryList.map((sub) => (
          <li key={sub.id} className="border  rounded-lg shadow-md">
            <button
              className="flex items-center justify-between w-full p-4  rounded-t-lg focus:outline-none"
              onClick={() => toggleExpand(sub.id)}
            >
              <span className="text-lg font-medium">{sub.plan.name}</span>
              <span className="text-sm text-gray-500">
                {sub.subscriptionEnd
                  ? `Zakończona: ${new Date(
                      sub.subscriptionEnd
                    ).toLocaleDateString()}`
                  : "Aktywna"}
              </span>
            </button>
            {expandedId === sub.id && (
              <div className="p-4 ">
                <p>
                  <strong>Plan:</strong> {sub.plan.name}
                </p>
                <p>
                  <strong>Data rozpoczęcia:</strong>{" "}
                  {new Date(sub.subscriptionStart).toLocaleDateString()}
                </p>
                <p>
                  <strong>Data zakończenia:</strong>{" "}
                  {sub.subscriptionEnd
                    ? new Date(sub.subscriptionEnd).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Cena:</strong>{" "}
                  {sub.interval === "month"
                    ? sub.plan.monthlyPrice
                    : sub.plan.yearlyPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      sub.status === "active"
                        ? "text-green-600"
                        : sub.status === "canceled"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {sub.status === "active"
                      ? "Aktywna"
                      : sub.status === "canceled"
                      ? "Anulowana"
                      : "Wygasła"}
                  </span>
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
