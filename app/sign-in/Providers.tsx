import React from "react";
import { signIn } from "../auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import Image from "next/image";

export default function Providers({
  providersList,
}: {
  providersList: {
    id: string;
    name: string;
  }[];
}) {
  return (
    <div className="space-y-3 w-full ">
      {Object.values(providersList).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: "/dashboard",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`/sign-in?provider_error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 bg-black/70 md:bg-gray-700 hover:bg-gray-600 border border-secondary text-white rounded-full shadow-md transition duration-300"
          >
            <Image
              src={`/icons/${provider.id}.svg`}
              alt={`${provider.name} icon`}
              className="w-5 h-5 mr-3"
              width={48}
              height={48}
            />
            <span>Zaloguj przez {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
