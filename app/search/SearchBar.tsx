"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((query) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-col gap-3 max-w-lg w-full mx-auto">
      <label htmlFor="search">Czego szukasz?</label>
      <input
        id="search"
        type="text"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="border rounded p-2 flex-grow text-black w-full"
        placeholder="Szukaj filmów lub aktorów..."
      />
    </div>
  );
}
