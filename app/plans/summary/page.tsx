"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
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

import Link from "next/link";
import Image from "next/image";
import bg from "@/public/summaryBg-lg.jpg";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";

const SubscriptionSummaryContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("id") || "standard";
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

  const linkClass = `flex basis-1/2 justify-center items-center text-center px-6 py-3  rounded-lg transition-all duration-300 hover:scale-105`;

  const featuresData = [
    {
      icon: MdDevices,
      label: "Liczba urządzeń",
      value: selectedPlan.devicesNumber,
      color: "text-blue-500",
    },
    {
      icon: MdFamilyRestroom,
      label: "Rodzinna subskrypcja",
      value: selectedPlan.familySharing,
      color: "text-purple-500",
    },
    {
      icon: HiCloudDownload,
      label: "Oglądanie offline",
      value: selectedPlan.offlineView,
      color: "text-green-500",
    },
    {
      icon: MdHdrOn,
      label: "HDR",
      value: selectedPlan.HDR,
      color: "text-yellow-500",
    },
    {
      icon: FaVolumeUp,
      label: "Dolby Atmos",
      value: selectedPlan.DolbyAtmos,
      color: "text-red-500",
    },
    {
      icon: MdBlock,
      label: "Brak reklam",
      value: selectedPlan.adsFree,
      color: "text-orange-500",
    },
    {
      icon: MdCancel,
      label: "Możliwość anulowania",
      value: selectedPlan.cancelAllowed,
      color: "text-gray-500",
    },
  ];

  return (
    <PageContainer className="relative overflow-hidden">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 "
        alt="Background image cinema"
        src={bg}
        quality={100}
      />

      <div className="py-2 md:p-6 max-w-4xl mx-auto bg-opacity-80 rounded-lg">
        <div className="border border-borderPrimary p-6 rounded-lg shadow-md bg-black/80">
          {/* Informacje o planie */}
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Typ planu: {selectedPlan.name}
          </h2>

          <div className="mb-4">
            <p className="text-secondary">Cena:</p>
            <p className="text-xl">
              {priceCycle === "monthly"
                ? `${selectedPlan.price.monthly} zł / miesiąc`
                : `${selectedPlan.price.yearly} zł / rok`}
            </p>
          </div>

          {/* Sekcja funkcji */}
          <div className="mb-4">
            <p className="text-secondary">Dostępne funkcje:</p>
            <ul className="space-y-4">
              {featuresData.map(({ icon: Icon, label, value, color }) => (
                <li key={label} className="flex justify-between border-b">
                  <div className="flex items-center gap-2 ">
                    <Icon className={color} />
                    <span>{label}</span>
                  </div>
                  <span className="text-secondary">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sekcja podsumowania */}
          <div className="border border-borderPrimary p-4 rounded-lg mb-4">
            <p className="text-sm text-secondary">
              Wybierając plan{" "}
              <span className="font-bold">{selectedPlan.name}</span>,
              otrzymujesz dostęp do wszystkich wyżej wymienionych funkcji bez
              żadnych ukrytych kosztów.
            </p>
          </div>

          {/* Przycisk akcji */}
          <div className="flex gap-4 justify-self-end">
            <Link
              href={`/plans`}
              onClick={() => router.push(`/plans`)}
              className={`bg-backgroundLight ${linkClass}`}
            >
              Wróć do wyboru planu
            </Link>
            <Link href={`/payment`} className={`bg-primary ${linkClass}`}>
              Wybierz plan
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default function SubscriptionSummary() {
  return (
    <Suspense>
      <SubscriptionSummaryContent />
    </Suspense>
  );
}
