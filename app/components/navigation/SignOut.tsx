"use client";
import { signOut } from "next-auth/react";

export default function SignOut({ className }: { className?: string }) {
  return (
    <button
      className={`text-start ${className}`}
      onClick={async () => {
        await signOut({ redirectTo: "/" });
      }}
    >
      Wyloguj
    </button>
  );
}
