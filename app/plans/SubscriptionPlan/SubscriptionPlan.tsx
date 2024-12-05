"use client";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import { type SubscriptionPlan } from "@/app/types/types";

import React, { useState } from "react";

export default function SubscriptionPlan({
  plansData,
}: {
  plansData: SubscriptionPlan[];
}) {
  const [priceCycle, setPriceCycle] = useState("monthly");

  function renderPlanOptions(plansList: SubscriptionPlan[]) {
    return plansList.map((plan) => (
      <SubscriptionPlanCard
        key={plan.id}
        planDesc={plan.description}
        planName={plan.name}
        planId={plan.id}
        planPrice={{ monthly: plan.monthlyPrice, yearly: plan.yearlyPrice }}
        priceCycle={priceCycle}
      />
    ));
  }

  return (
    <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
      <header>
        <h2 className="mb-3 text-h2 ">Wybierz odpowiedni plan</h2>
        <p className="text-sm text-secondary">
          Dołącz do CineBase i wybierz jedną z naszych elastycznych opcji
          subskrypcji dostosowanych do Twoich preferencji oglądania. Przygotuj
          się na nieprzerwaną rozrywkę!
        </p>
      </header>
      <div className="flex p-2 bg-backgroundFooter rounded-lg">
        <button
          onClick={() => setPriceCycle("monthly")}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            priceCycle === "monthly" ? "bg-background " : " bg-transparent"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setPriceCycle("yearly")}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            priceCycle === "yearly" ? "bg-background " : " bg-transparent"
          }`}
        >
          Yearly
        </button>
      </div>

      <ul className="flex flex-col gap-5 md:flex-row">
        {renderPlanOptions(plansData)}
      </ul>
    </div>
  );
}
