"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SwitchButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const isFilters = params.get("type")?.toString() === "filters";

  const [isChecked, setIsChecked] = useState(isFilters);

  const toggleSwitch = () => {
    if (isChecked) {
      params.set("type", "query");
      const newUrl = params.toString();
      router.replace(`${pathname}?${newUrl}`);
    } else {
      params.set("type", "filters");
      const newUrl = params.toString();
      router.replace(`${pathname}?${newUrl}`);
    }
    setIsChecked((prev) => !prev);
  };
  return (
    <button
      onClick={toggleSwitch}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        isChecked ? "bg-lime-900 " : "bg-neutral-400"
      }`}
    >
      <div
        className={`pointer-events-none block h-5 w-5 rounded-full ${
          isChecked ? "bg-background" : "bg-slate-600"
        } shadow-lg ring-0 transition-transform ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
}
