import React from "react";
import NameForm from "../components/NameForm";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) return redirect("/");
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Zmień swoją nazwe</h2>
      <NameForm />
    </div>
  );
}
