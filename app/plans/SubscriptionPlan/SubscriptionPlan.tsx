"use client";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import { type SubscriptionPlan } from "@/app/types/types";

import React, { useState } from "react";

export default function SubscriptionPlan({
  plansData,
}: {
  plansData: SubscriptionPlan[];
}) {
  const [priceCycle, setPriceCycle] = useState("month");

  function renderPlanOptions(plansList: SubscriptionPlan[]) {
    return plansList.map((plan) => (
      <SubscriptionPlanCard key={plan.id} plan={plan} priceCycle={priceCycle} />
    ));
  }

  return (
    <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <header>
          <h2 className="mb-3 text-h2 ">Wybierz odpowiedni plan</h2>
          <p className="text-sm text-secondary">
            Dołącz do CineBase i wybierz jedną z naszych elastycznych opcji
            subskrypcji dostosowanych do Twoich preferencji oglądania. Przygotuj
            się na nieprzerwaną rozrywkę!
          </p>
        </header>
        <div className="flex  p-2 bg-backgroundFooter rounded-lg">
          <button
            onClick={() => setPriceCycle("month")}
            className={`px-4 py-2 bg-backgroundLight basis-1/2 rounded-md transition-all duration-300 ${
              priceCycle === "month" ? "bg-background " : " bg-transparent"
            }`}
          >
            Miesięcznie
          </button>
          <button
            onClick={() => setPriceCycle("year")}
            className={`px-4 py-2 bg-backgroundLight basis-1/2 rounded-md transition-all duration-300 ${
              priceCycle === "year" ? "bg-background " : " bg-transparent"
            }`}
          >
            Rocznie
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-5  max-w-full md:flex-row md:justify-between overflow-hidden">
        {renderPlanOptions(plansData)}
      </ul>
    </div>
  );
}
