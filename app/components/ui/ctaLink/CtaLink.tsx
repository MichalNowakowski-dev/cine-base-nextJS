"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function CtaLink({
  href,
  className,
  children,
  play = false,
}: {
  href: string;
  play?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <Link
      href={session ? href : "/sign-in"}
      className={`flex gap-x-1 items-center justify-center bg-primary hover:bg-red-800 text-white  rounded-md py-3 px-4 ${className}`}
    >
      {play && <FaPlay />}
      {children}
    </Link>
  );
}
