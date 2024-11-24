"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/public/CineBaseLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: { label: string; href: string }[] = [
  { label: "Strona główna", href: "/" },
  { label: "Filmy & Seriale", href: "/movies&series" },
  { label: "Pomoc", href: "/support" },
  { label: "Subskrypcje", href: "/plans" },
];

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileNavDisplayed, setIsMobileNavDisplayed] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();

  const styles = {
    nav: `w-full h-20 fixed flex items-center py-3 z-50 transition-transform duration-300 ${
      isMobileNavDisplayed ? "translate-y-0" : "-translate-y-full"
    }`,
    navBackground: isMobileNavOpen
      ? "bg-black"
      : "bg-[#00000070] backdrop-blur-sm",
    logo: "w-[17vw] max-w-28",
    desktopNav: "hidden md:flex gap-2 border-2 border-gray-600 p-2 rounded-md",
    navItem: (isActive: boolean) =>
      `${
        isActive ? "text-white bg-backgroundLight" : "text-secondary bg-none"
      } rounded-md flex items-center hover:bg-backgroundLight`,
    mobileNav: `absolute top-[130%] left-0 w-full lg:hidden bg-black flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ease-in-out`,
    mobileNavItem: (isActive: boolean) =>
      `${
        isActive
          ? "text-white bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-lg"
          : "text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:shadow-lg"
      } 
      px-8 py-4 rounded-lg w-[80%] text-center text-lg transition-all duration-300`,
    mobileButton:
      "p-3 bg-backgroundLight border-2 border-gray-600 rounded-md flex items-center justify-center md:hidden",
  };

  function openMobileNav() {
    setIsMobileNavOpen((prevState) => !prevState);
    if (isMobileNavOpen) {
      window.document.body.style.overflow = "scroll";
    } else {
      window.document.body.style.overflow = "hidden";
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0) {
      setIsMobileNavDisplayed(true);
    } else {
      const isScrollingUp = currentScrollY < lastScrollY.current;
      setIsMobileNavDisplayed(isScrollingUp);
    }
    lastScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    window.document.body.style.overflow = "scroll";
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${styles.navBackground}`}>
      <div className="xl:max-w-screen-xl mx-auto flex justify-between items-center w-full px-3 relative">
        {/* Logo */}
        <Link href={"/"} className={styles.logo}>
          <Image src={Logo} alt="CineBase Logo image" />
        </Link>

        {/* Desktop navigation */}
        <ul className={styles.desktopNav}>
          {navItems.map(({ label, href }) => (
            <li key={label} className={styles.navItem(pathname === href)}>
              <Link className="px-3 py-2" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search and Mobile button */}
        <div className="flex items-center gap-5">
          <Link
            href={"/search"}
            className="flex gap-2 items-center bg-transparent border-none"
          >
            <GoSearch size={25} />
          </Link>

          <button onClick={openMobileNav} className={styles.mobileButton}>
            {isMobileNavOpen ? (
              <IoClose size={20} />
            ) : (
              <HiOutlineMenuAlt3 size={20} />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileNavOpen && (
          <ul className={styles.mobileNav}>
            {navItems.map(({ label, href }) => (
              <li
                key={label}
                className={styles.mobileNavItem(pathname === href)}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
