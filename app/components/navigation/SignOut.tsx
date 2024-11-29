"use client";
import { signOut } from "next-auth/react";

export default function SignOut({ className }: { className?: string }) {
  return (
    <button
      className={`flex gap-x-1 items-center justify-center bg-primary hover:bg-red-800 text-white  rounded-md py-3 px-4 ${className}`}
      onClick={() => signOut()}
    >
      Wyloguj
    </button>
  );
}
