import React from "react";

export default function SubscriptionPlanCard({
  planName,
  priceCycle,
  planDesc,
  planPrice,
}: {
  planName: string;
  priceCycle: string;
  planDesc: string;
  planPrice: { monthly: number; yearly: number };
}) {
  return (
    <div className="p-4 bg-backgroundLight border border-[#262626] rounded-md">
      <header className="flex flex-wrap gap-4 mb-5">
        <h3 className="text-h3">{planName}</h3>
        <p>{planDesc}</p>
        <h3 className="text-h3">
          {priceCycle === "monthly" ? planPrice.monthly : planPrice.yearly}zł
          <span className="text-sm text-secondary">
            {priceCycle === "monthly" ? "/miesiąc" : "/rok"}
          </span>
        </h3>
      </header>
      <div className="flex justify-between gap-3">
        <button className=" px-6 basis-1/2 py-4 bg-backgroundFooter rounded-md border-[#262626] border">
          Okres próbny
        </button>
        <button className=" px-4 basis-1/2 py-2 bg-primary rounded-md border-[#262626] border">
          Wybierz Plan
        </button>
      </div>
    </div>
  );
}
