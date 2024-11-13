"use client";
import SwitchButton from "../MediaListCarousel/SwitchButton";
import SubscriptionPlanCard from "./SubscriptionPlanCard";

const subscriptionPlanData = [
  {
    name: "Podstawowy",
    description:
      "Ciesz się bogatą biblioteką filmów i programów, zawierającą różnorodne treści, w tym niedawno wydane tytuły",
    price: {
      monthly: 19.99,
      yearly: 199,
    },
  },
  {
    name: "Standard",
    description:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści. Ograniczone reklamy",
    price: {
      monthly: 24.99,
      yearly: 250,
    },
  },
  {
    name: "Premium",
    description:
      "Dostęp do najszerszej oferty filmów i programów, w tym wszystkich nowości i opcji oglądania offline. Brak reklam",
    price: {
      monthly: 29.99,
      yearly: 300,
    },
  },
];

import React, { useState } from "react";

export default function SubscriptionPlan() {
  const [priceCycle, setPriceCycle] = useState("monthly");

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
        {subscriptionPlanData.map((plan) => (
          <SubscriptionPlanCard
            key={plan.name}
            planDesc={plan.description}
            planName={plan.name}
            planPrice={plan.price}
            priceCycle={priceCycle}
          />
        ))}
      </ul>
    </div>
  );
}
