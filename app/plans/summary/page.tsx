"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { plansData } from "@/app/lib/plansData";
import { HiCloudDownload } from "react-icons/hi";
import { FaVolumeUp } from "react-icons/fa";
import {
  MdFamilyRestroom,
  MdDevices,
  MdHdrOn,
  MdBlock,
  MdCancel,
} from "react-icons/md";
import BackgroundVideo from "./videoBackground";

export default function SubscriptionSummary() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("id") || "standard";
  const trial = searchParams.get("trial") || false;
  const priceCycle = searchParams.get("price-cycle") || "monthly";

  const selectedPlan = plansData[plan as keyof typeof plansData];

  if (!selectedPlan) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Nie wybrano żadnego planu subskrypcji!
        </p>
      </div>
    );
  }

  const handleProceedToPayment = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const { sessionId } = await res.json();

      // Przekierowanie do Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (err) {
      console.error("Błąd podczas tworzenia sesji płatności:", err);
    }
  };

  return (
    <main className="relative min-h-screen mx-auto pt-24 md:pt-28 px-4 overflow-hidden">
      <BackgroundVideo />

      <div className="p-6 max-w-4xl mx-auto  bg-opacity-80 rounded-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Podsumowanie Subskrypcji
        </h1>

        <div className=" border border-borderPrimary p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Typ planu: {selectedPlan.name}
          </h2>

          <div className="mb-4">
            <p className="text-secondary">Opis:</p>
            <p>{selectedPlan.description}</p>
          </div>

          <div className="mb-4">
            <p className="text-secondary">Cena:</p>
            <p className="text-xl">
              {priceCycle === "monthly"
                ? `${selectedPlan.price.monthly} zł / miesiąc`
                : `${selectedPlan.price.yearly} zł / rok`}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-secondary">Okres próbny:</p>
            <p>{selectedPlan.trialPeriod} dni</p>
          </div>

          <div className="mb-4">
            <p className="text-secondary">Dostępne funkcje:</p>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <MdDevices className="text-blue-500" />
                  <span>Liczba urządzeń</span>
                </div>
                <span className="text-secondary">
                  {selectedPlan.devicesNumber}
                </span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <MdFamilyRestroom className="text-purple-500" />
                  <span>Rodzinna subskrypcja</span>
                </div>
                <span className="text-secondary">
                  {selectedPlan.familySharing}
                </span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <HiCloudDownload className="text-green-500" />
                  <span>Oglądanie offline</span>
                </div>
                <span className="text-secondary">
                  {selectedPlan.offlineView}
                </span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <MdHdrOn className="text-yellow-500" />
                  <span>HDR</span>
                </div>
                <span className="text-secondary">{selectedPlan.HDR}</span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <FaVolumeUp className="text-red-500" />
                  <span>Dolby Atmos</span>
                </div>
                <span className="text-secondary">
                  {selectedPlan.DolbyAtmos}
                </span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <MdBlock className="text-orange-500" />
                  <span>Brak reklam</span>
                </div>
                <span className="text-secondary">{selectedPlan.adsFree}</span>
              </li>

              <li className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <MdCancel className="text-gray-500" />
                  <span>Możliwość anulowania</span>
                </div>
                <span className="text-secondary">
                  {selectedPlan.cancelAllowed}
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-self-end">
            <button
              onClick={() => router.push(`/plans`)}
              className="px-6 py-3 bg-backgroundLight text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              Wróć do wyboru planu
            </button>
            <button
              onClick={handleProceedToPayment}
              className="px-6 py-3 bg-primary text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              Wybierz plan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
