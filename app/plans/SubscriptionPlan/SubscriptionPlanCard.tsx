import { SubscriptionPlan } from "@/app/types/types";
import Link from "next/link";
import React from "react";

export default function SubscriptionPlanCard({
  plan,
  priceCycle,
}: {
  plan: SubscriptionPlan;
  priceCycle: string;
}) {
  // Sprawdzamy czy wartości są poprawne
  const price = priceCycle === "month" ? plan.monthlyPrice : plan.yearlyPrice;
  const priceLabel = priceCycle === "month" ? "/miesiąc" : "/rok";

  const buttonClass =
    "text-center content-center hover:scale-105 transition-all duration-150  px-6 py-4 border-[#262626] border rounded-md";

  return (
    <li className="p-4 bg-backgroundLight border border-[#262626] rounded-md basis-1/3 md:basis-[30%]">
      <header className="flex flex-wrap gap-4 mb-5">
        <h3 className="text-h3">{plan.name}</h3>
        <p>{plan.description}</p>
        <h3 className="text-h3 w-full">
          <span>{price}zł</span>
          <span className="text-sm text-secondary">{priceLabel}</span>
        </h3>
      </header>
      <div className="flex justify-between gap-3">
        <Link
          href={`plans/summary?id=${plan.id}&priceCycle=${priceCycle}&trial=true`}
          className={`${buttonClass}  bg-backgroundFooter`}
        >
          Okres próbny
        </Link>
        <Link
          href={`plans/summary?id=${plan.id}&priceCycle=${priceCycle}`}
          className={`${buttonClass} bg-primary`}
        >
          Wybierz Plan
        </Link>
      </div>
    </li>
  );
}
