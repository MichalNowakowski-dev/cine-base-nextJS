import SignOut from "@/app/components/navigation/SignOut";
import Link from "next/link";
import React from "react";

export default function UserPanel({
  links,
  className,
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`block py-2 px-4 rounded transition text-white hover:bg-gray-700`}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <li className="">
        <div className="h-[2px] bg-white w-full"></div>
        <SignOut className="w-full py-2 my-2 px-4 rounded transition text-white hover:bg-gray-700" />
      </li>
    </ul>
  );
}
