"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/public/CineBaseLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navigationData";
import UserAccountNav from "./UserAccountNav";
import { navigationStyles } from "@/app/styles";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileNavDisplayed, setIsMobileNavDisplayed] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { data: session } = useSession();

  function toggleNav() {
    setIsMobileNavOpen((prev) => !prev);

    if (!isMobileNavOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
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
    window.document.body.style.overflow = "auto";
  }, [pathname]);

  return (
    <nav
      className={`${navigationStyles.nav(isMobileNavDisplayed)} ${
        navigationStyles.navBackground
      } `}
    >
      <div className=" mx-auto flex justify-between items-center w-full px-4 relative">
        <Link
          href={"/"}
          className={navigationStyles.logo}
          aria-label="Strona główna"
        >
          <Image src={Logo} alt="CineBase Logo" />
        </Link>

        <ul className={navigationStyles.desktopNav}>
          {navLinks.map(({ label, href }) => {
            if (label === "Panel" && !session) return;
            return (
              <li
                key={label}
                className={navigationStyles.navItem(pathname === href)}
              >
                <Link className="px-3 py-2" href={href} aria-label={label}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {isMobileNavOpen && (
          <div
            onClick={() => {
              setIsMobileNavOpen(false);
            }}
            onTouchStart={() => {
              setIsMobileNavOpen(false);
            }}
            className="fixed bg-black/70 h-screen-minus-nav w-screen top-20 left-0 z-10 px-4 flex justify-end items-start"
          >
            <ul
              onClick={(e) => {
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              className={navigationStyles.mobileNav(isMobileNavDisplayed)}
            >
              {navLinks.map(({ label, href }) => (
                <li
                  key={label}
                  className={`${navigationStyles.mobileNavItem(
                    pathname === href
                  )}`}
                >
                  <Link aria-label={label} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
              <li
                className={` ${navigationStyles.mobileNavItem(
                  pathname === "/sign-in"
                )} bg-red-700 xs:hidden `}
              >
                <Link aria-label="Zaloguj się" href={"/sign-in"}>
                  Zaloguj się
                </Link>
              </li>
              <li
                className={` ${navigationStyles.mobileNavItem(
                  pathname === "/sign-up"
                )}bg-blue-700 xs:hidden`}
              >
                <Link aria-label="Zarejestruj się" href={"/sign-up"}>
                  Dołącz do nas
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="flex items-center gap-5">
          <Link
            aria-label="Wyszukaj"
            href={"/search?type=query"}
            className="p-2 flex gap-2 items-center bg-transparent rounded-full hover:bg-white "
          >
            <GoSearch size={30} fill="gray" />
          </Link>

          <UserAccountNav session={session} />

          <button onClick={toggleNav} className={navigationStyles.mobileButton}>
            {isMobileNavOpen ? (
              <IoClose size={25} />
            ) : (
              <HiOutlineMenuAlt3 size={25} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
