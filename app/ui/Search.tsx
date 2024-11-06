"use client";

import { GoSearch } from "react-icons/go";

export default function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className: string;
}) {
  function handleSearch(term: string) {
    console.log(term);
  }

  return (
    <div className={`relative flex flex-1 flex-shrink-0 w-[80%] ${className}`}>
      <input
        className="peer block w-full rounded-full py-[9px] pl-10 text-sm placeholder:text-gray-500 text-black outline-none"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <GoSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
