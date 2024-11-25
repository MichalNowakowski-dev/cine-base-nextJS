"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={() => signOut()}
    >
      Wyloguj
    </button>
  );
}
