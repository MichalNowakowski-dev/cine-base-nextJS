"use client";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import { plansData } from "@/app/lib/plansData";
import { SubscriptionPlanData } from "@/app/lib/types";

import React, { useState } from "react";

export default function SubscriptionPlan() {
  const [priceCycle, setPriceCycle] = useState("monthly");

  function renderPlanOptions(obj: SubscriptionPlanData) {
    return Object.entries(obj).map(([key, plan]) => {
      return (
        <SubscriptionPlanCard
          key={plan.id}
          planDesc={plan.description}
          planName={plan.name}
          planId={plan.id}
          planPrice={plan.price}
          priceCycle={priceCycle}
        />
      );
    });
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

      <ul className="flex flex-wrap gap-5 md:flex-nowrap">
        {renderPlanOptions(plansData)}
      </ul>
    </div>
  );
}
