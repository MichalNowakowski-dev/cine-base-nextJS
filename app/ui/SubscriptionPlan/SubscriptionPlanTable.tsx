import { SubscriptionPlan, SubscriptionPlanData } from "@/app/lib/types";
import React from "react";

const SubscriptionTable = ({ data }: { data: SubscriptionPlanData }) => {
  const features: { key: string; label: string }[] = [
    { key: "price", label: "Cena (PLN)" },
    { key: "devicesNumber", label: "Liczba urządzeń" },
    { key: "trialPeriod", label: "Okres próbny (dni)" },
    { key: "cancelAllowed", label: "Możliwość anulowania" },
    { key: "HDR", label: "HDR" },
    { key: "DolbyAtmos", label: "Dolby Atmos" },
    { key: "adsFree", label: "Brak reklam" },
    { key: "offlineView", label: "Oglądanie offline" },
    { key: "familySharing", label: "Udostępnianie rodzinne" },
  ];

  return (
    <div className="overflow-x-auto hidden lg:block rounded-lg w-full">
      <table className="min-w-full border-collapse border border-borderPrimary text-secondary">
        <thead className="bg-backgroundFooter ">
          <tr className="flex text-white">
            <th className="border border-borderPrimary py-6 text-center font-light basis-1/4 text-xl">
              Funkcjonalność
            </th>
            {Object.values(data).map((plan) => (
              <th
                key={plan.name}
                className="border border-borderPrimary py-6 font-light basis-1/4"
              >
                <div className="flex gap-2 justify-center items-center text-xl">
                  {plan.name}{" "}
                  {plan.popular && (
                    <span className="px-2 py-1 bg-primary text-xs font-light rounded-md">
                      Popularne
                    </span>
                  )}{" "}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.key} className="flex">
              <td className="border border-borderPrimary font-light text-center py-6 basis-1/4">
                {feature.label}
              </td>
              {Object.values(data).map((plan) => {
                // Sprawdź, czy właściwość plan[feature.key] jest obiektem, jeśli tak, wybierz odpowiednią wartość
                const featureValue =
                  plan[feature.key as keyof SubscriptionPlan];
                const displayValue =
                  typeof featureValue === "object" && featureValue !== null
                    ? featureValue.monthly // np. "monthly" lub "yearly"
                    : featureValue;

                return (
                  <td
                    key={plan.name}
                    className="border border-borderPrimary py-6 text-center basis-1/4"
                  >
                    {displayValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
