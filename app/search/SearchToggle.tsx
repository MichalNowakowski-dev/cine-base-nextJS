"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ToggleButton from "../components/ui/toggleButton/ToggleButton"; // Importuj komponent uniwersalny

const SearchToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const isFilters = params.get("type") === "filters";
  const [isChecked, setIsChecked] = useState(isFilters);

  const handleToggle = (newState: boolean) => {
    params.set("type", newState ? "filters" : "query");
    const newUrl = params.toString();
    router.replace(`${pathname}?${newUrl}`);
    setIsChecked(newState);
  };

  return <ToggleButton isChecked={isChecked} onToggle={handleToggle} />;
};

export default SearchToggle;
