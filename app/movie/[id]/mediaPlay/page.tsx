import UnavailableMedia from "@/app/components/ui/unavailableMedia/unavailableMedia";
import React from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <div className="mx-auto bg-mediaPlayBg bg-contain bg-center bg-no-repeat">
      <UnavailableMedia />
    </div>
  );
}
