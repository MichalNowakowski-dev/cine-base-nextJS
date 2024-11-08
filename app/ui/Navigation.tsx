"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/public/CineBaseLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
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
    <nav
      className={`w-full h-20 ${
        isMobileNavOpen ? "bg-zinc-800" : "bg-background"
      } backdrop-blur-sm md:h-24 fixed flex items-center py-3 z-20`}
    >
      <div className="xl:max-w-screen-xl mx-auto flex justify-between items-center w-full px-3 ">
        <Link href={"/"} className="w-[17vw] max-w-28">
          <Image priority src={Logo} alt="CineBase Logo image" />
        </Link>
        <ul className="hidden md:flex gap-2 border-2 border-gray-600 bg-black p-2 rounded-md">
          {navItems.map(({ label, href }) => (
            <li
              className={`${
                pathname === href
                  ? "text-white bg-backgroundLight"
                  : "text-secondary bg-none"
              }  rounded-md flex items-center hover:bg-backgroundLight`}
              key={label}
            >
              <Link className="px-3 py-2" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-2 items-center">
          <Link href={"/advanced-search"}>
            <GoSearch size={25} />
          </Link>
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
          <ul className="absolute top-20 left-0 w-full h-screen text-center bg-zinc-800">
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
      </div>
    </nav>
  );
}
