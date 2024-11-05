"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/CineBaseLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: { label: string; href: string }[] = [
  { label: "Strona główna", href: "/" },
  { label: "Filmy & Seriale", href: "/movies&shows" },
  { label: "Pomoc", href: "/support" },
  { label: "Subskrypcje", href: "/subscriptions" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="py-3 flex h-16 justify-between bg-transparent backdrop-blur-md md:h-24 ">
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
      <button className="p-3 bg-backgroundLight border-2 border-gray-600 rounded-md flex items-center justify-center md:hidden">
        <HiOutlineMenuAlt3 size={20} />
      </button>
    </nav>
  );
}
