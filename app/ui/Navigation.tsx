"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/public/CineBaseLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: { label: string; href: string }[] = [
  { label: "Strona główna", href: "/" },
  { label: "Filmy & Seriale", href: "/movies&shows" },
  { label: "Pomoc", href: "/support" },
  { label: "Subskrypcje", href: "/subscriptions" },
];

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  function openMobileNav() {
    setIsMobileNavOpen((prevState) => !prevState);
    if (isMobileNavOpen) {
      window.document.body.style.overflow = "scroll";
    } else {
      window.document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    setIsMobileNavOpen(false);
    window.document.body.style.overflow = "scroll";
  }, [pathname]);
  return (
    <nav className="py-3 px-4 flex h-16 justify-between bg-[#00000050] backdrop-blur-sm md:h-24 z-10 sticky top-0 ">
      <Image className="w-auto" src={Logo} alt="CineBase Logo image" />
      <ul className="hidden md:flex gap-2 border-2 border-gray-600 bg-black p-2 rounded-md">
        {navItems.map(({ label, href }) => (
          <li
            className={`${
              pathname === href
                ? "text-white bg-backgroundLight"
                : "text-secondary bg-none"
            } px-3 py-2 rounded-md flex items-center`}
            key={label}
          >
            <Link className={``} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:flex gap-2 items-center">
        <GoSearch size={25} />
        <IoIosNotificationsOutline size={30} />
      </div>
      <button
        onClick={openMobileNav}
        className="p-3 bg-backgroundLight border-2 border-gray-600 rounded-md flex items-center justify-center md:hidden"
      >
        {isMobileNavOpen ? (
          <IoClose size={20} />
        ) : (
          <HiOutlineMenuAlt3 size={20} />
        )}
      </button>
      {isMobileNavOpen && (
        <ul className="bg-fade-red-to-black absolute top-16 left-0 w-full text-center">
          {navItems.map(({ label, href }) => (
            <li
              className={`${
                pathname === href
                  ? "text-white bg-backgroundLight"
                  : "text-secondary bg-none"
              } px-3 py-2 rounded-md mb-5`}
              key={label}
            >
              <Link className={``} href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
