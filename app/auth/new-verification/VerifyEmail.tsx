"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailSuccess({ message }: { message: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>Weryfikacja e-maila</h1>
      <p className={`text-green-900 p-3 rounded-lg bg-green-200 `}>{message}</p>
    </div>
  );
}
