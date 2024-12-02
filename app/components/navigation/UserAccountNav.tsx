"use client";

import { accountLinks } from "./navigationData";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import SignOut from "./SignOut";
import { navigationStyles } from "@/app/styles";

export default function UserAccountNav({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Ikona użytkownika */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // onTouchStart={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center border-4 border-transparent p-1 lg:hover:border-white ${
          isOpen && "border-white"
        } rounded-full`}
      >
        <FaUserCircle size={30} />
      </button>

      {/* Rozwijana lista */}
      {isOpen && (
        <div
          onMouseLeave={() => {
            setIsOpen(false);
          }}
          className="fixed top-20 left-0 lg:bg-transparent bg-black/70 h-screen-minus-nav lg:h-auto  w-screen lg:max-w-7xl lg:left-1/2 lg:-translate-x-1/2   z-10 px-4 flex justify-end items-start"
        >
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className={navigationStyles.mobileNav(isOpen)}
          >
            {accountLinks.map((item) => {
              if (isAuthenticated && item.private) {
                return (
                  <div key={item.href} className="min-w-32">
                    <Link
                      href={item.href}
                      className="text-white text-center py-2 px-4 rounded-md hover:bg-zinc-500 w-full block"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              } else if (!isAuthenticated && !item.private) {
                return (
                  <div key={item.href} className="min-w-32">
                    <Link
                      href={item.href}
                      className="text-white text-center py-2 px-4 rounded-md hover:bg-zinc-500 w-full block"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }
            })}

            {isAuthenticated && <SignOut />}
          </div>
        </div>
      )}
    </div>
  );
}
