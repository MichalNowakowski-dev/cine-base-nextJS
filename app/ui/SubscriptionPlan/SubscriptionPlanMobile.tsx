"use client";

import { SubscriptionPlanData } from "@/app/lib/types";
import React, { useState } from "react";

export default function SubscriptionPlanMobile({
  data,
}: {
  data: SubscriptionPlanData;
}) {
  const [selectedPlan, setSelectedPlan] = useState(data.standard);
  return (
    <section className="flex flex-col gap-5 lg:hidden">
      <div className="flex p-2 bg-backgroundFooter rounded-lg border border-borderPrimary font-light">
        <button
          onClick={() => setSelectedPlan(data.basic)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === data.basic.name
              ? "bg-background text-white"
              : " bg-transparent text-secondary"
          }`}
        >
          {data.basic.name}
        </button>
        <button
          onClick={() => setSelectedPlan(data.standard)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === data.standard.name
              ? "bg-background text-white"
              : " bg-transparent text-secondary"
          }`}
        >
          {data.standard.name}
        </button>
        <button
          onClick={() => setSelectedPlan(data.premium)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === data.premium.name
              ? "bg-background text-white"
              : " bg-transparent text-secondary"
          }`}
        >
          {data.premium.name}
        </button>
      </div>
      <main className="grid grid-cols-2 gap-5 p-6 bg-backgroundFooter rounded-lg border border-borderPrimary font-light">
        <div className="flex flex-col col-start-1">
          <h5 className="text-secondary">Cena</h5>
          <p>{selectedPlan.price}zł/Miesiąc</p>
        </div>
        <div className="flex flex-col col-start-2">
          <h5 className="text-secondary">Okres próbny</h5>
          <p>{selectedPlan.trialPeriod} dni</p>
        </div>
        <div className="flex flex-col col-span-2">
          <h5 className="text-secondary">Zawartość</h5>
          <p>{selectedPlan.content}</p>
        </div>
        <div className="flex flex-col col-span-2">
          <h5 className="text-secondary">Urządzenia</h5>
          <p>{selectedPlan.devicesNumber} urządzenia jednocześnie</p>
        </div>
        <div className="flex flex-col col-start-1">
          <h5 className="text-secondary">Możliwość anulowania</h5>
          <p>{selectedPlan.cancelAllowed ? "Tak" : "Nie"}</p>
        </div>
        <div className="flex flex-col col-start-2">
          <h5 className="text-secondary">HDR</h5>
          <p>{selectedPlan.HDR ? "Tak" : "Nie"}</p>
        </div>
        <div className="flex flex-col col-start-1">
          <h5 className="text-secondary">Dolby Atmos</h5>
          <p>{selectedPlan.DolbyAtmos ? "Tak" : "Nie"}</p>
        </div>
        <div className="flex flex-col col-start-2">
          <h5 className="text-secondary">Brak reklam</h5>
          <p>{selectedPlan.adsFree ? "Tak" : "Nie"}</p>
        </div>
        <div className="flex flex-col col-start-1">
          <h5 className="text-secondary">Oglądanie offline</h5>
          <p>{selectedPlan.offlineView}</p>
        </div>
        <div className="flex flex-col col-start-2">
          <h5 className="text-secondary">Współdzielenie konta</h5>
          <p>{selectedPlan.familySharing}</p>
        </div>
      </main>
    </section>
  );
}
