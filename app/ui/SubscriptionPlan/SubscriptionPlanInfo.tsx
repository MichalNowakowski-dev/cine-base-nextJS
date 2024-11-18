"use client";

const subscriptionPlanData = {
  basic: {
    name: "Podstawowy",
    price: 19.99,
    content: "Dostęp do szerokiego wyboru filmów i programów, w tym nowości.",
    devicesNumber: 1,
    trialPeriod: 7,
    cancelAllowed: true,
    HDR: false,
    DolbyAtmos: false,
    adsFree: false,
    offlineView: "Nie",
    familySharing: "Nie",
  },
  standard: {
    name: "Standard",
    content:
      "Dostęp do szerszego wyboru filmów i programów, w tym większości nowości i ekskluzywnych treści.",
    price: 24.99,
    devicesNumber: 2,
    trialPeriod: 7,
    cancelAllowed: true,
    HDR: true,
    DolbyAtmos: true,
    adsFree: true,
    offlineView: "Tak, dla wybranych tytułów",
    familySharing: "Tak, do 5 członków rodziny",
  },
  premium: {
    name: "Premium",
    content:
      "Dostęp do najszerszej oferty filmów i programów, w tym wszystkich nowości i opcji oglądania offline.",
    price: 29.99,
    devicesNumber: 3,
    trialPeriod: 7,
    cancelAllowed: true,
    HDR: true,
    DolbyAtmos: true,
    adsFree: true,
    offlineView: "Tak",
    familySharing: "Tak, do 7 członków rodziny",
  },
};

import React, { useState } from "react";

export default function SubscriptionPlanInfo() {
  const [selectedPlan, setSelectedPlan] = useState(
    subscriptionPlanData.standard
  );

  return (
    <div className="flex flex-wrap gap-8 justify-between items-center mb-8">
      <header>
        <h2 className="mb-3 text-h2 ">
          Porównaj nasze plany i znajdź ten odpowiedni dla siebie
        </h2>
        <p className="text-sm text-secondary">
          CineBase oferuje trzy różne plany dostosowane do Twoich potrzeb:
          Basic, Standard i Premium. Porównaj funkcje każdego planu i wybierz
          ten, który jest dla Ciebie odpowiedni.
        </p>
      </header>
      <div className="flex p-2 bg-backgroundFooter rounded-lg">
        <button
          onClick={() => setSelectedPlan(subscriptionPlanData.basic)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === subscriptionPlanData.basic.name
              ? "bg-background "
              : " bg-transparent"
          }`}
        >
          {subscriptionPlanData.basic.name}
        </button>
        <button
          onClick={() => setSelectedPlan(subscriptionPlanData.standard)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === subscriptionPlanData.standard.name
              ? "bg-background "
              : " bg-transparent"
          }`}
        >
          {subscriptionPlanData.standard.name}
        </button>
        <button
          onClick={() => setSelectedPlan(subscriptionPlanData.premium)}
          className={`px-4 py-2 bg-backgroundLight rounded-md transition-all duration-300 ${
            selectedPlan.name === subscriptionPlanData.premium.name
              ? "bg-background "
              : " bg-transparent"
          }`}
        >
          {subscriptionPlanData.premium.name}
        </button>
      </div>

      <section className="grid grid-cols-2 gap-5 p-6 bg-backgroundFooter rounded-lg ">
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
      </section>
    </div>
  );
}
