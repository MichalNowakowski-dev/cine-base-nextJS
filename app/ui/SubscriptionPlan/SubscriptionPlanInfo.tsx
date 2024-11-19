const subscriptionPlanData: SubscriptionPlanData = {
  basic: {
    name: "Podstawowy",
    price: 19.99,
    content: "Dostęp do szerokiego wyboru filmów i programów, w tym nowości.",
    devicesNumber: 1,
    trialPeriod: 7,
    cancelAllowed: "Tak",
    HDR: "Nie",
    DolbyAtmos: "Nie",
    adsFree: "Nie",
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
    cancelAllowed: "Tak",
    HDR: "Tak",
    DolbyAtmos: "Tak",
    adsFree: "Tak",
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
    cancelAllowed: "Tak",
    HDR: "Tak",
    DolbyAtmos: "Tak",
    adsFree: "Tak",
    offlineView: "Tak",
    familySharing: "Tak, do 7 członków rodziny",
  },
};

import SubscriptionTable from "./SubscriptionPlanTable";
import { SubscriptionPlanData } from "@/app/lib/types";
import SubscriptionPlanMobile from "./SubscriptionPlanMobile";

export default function SubscriptionPlanInfo() {
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
      <SubscriptionPlanMobile data={subscriptionPlanData} />
      <SubscriptionTable data={subscriptionPlanData} />
    </div>
  );
}
