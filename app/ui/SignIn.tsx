"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={() => signIn("google")}
    >
      Zaloguj
    </button>
  );
}
