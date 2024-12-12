"use client";
import ToggleButton from "@/app/components/ui/toggleButton/ToggleButton";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React, { useState } from "react";

export default function IntervalToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const yearInterval = params.get("priceCycle") === "year";

  const [isChecked, setIsChecked] = useState(yearInterval);

  const handleToggle = (newState: boolean) => {
    params.set("priceCycle", newState ? "year" : "month");
    const newUrl = params.toString();
    router.replace(`${pathname}?${newUrl}`);
    setIsChecked(newState);
  };
  return (
    <div className="flex items-center gap-2">
      <span>Płatność miesięczna</span>
      <ToggleButton isChecked={isChecked} onToggle={handleToggle} />
      <span>Płatność roczna</span>
    </div>
  );
}
