import UnavailableMedia from "@/app/components/ui/unavailableMedia/unavailableMedia";
import React from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (!session.user.planId) redirect("/plans");
  return (
    <div className="mx-auto w-screen bg-mediaPlayBg bg-center bg-no-repeat !max-w-full">
      <UnavailableMedia />
    </div>
  );
}
