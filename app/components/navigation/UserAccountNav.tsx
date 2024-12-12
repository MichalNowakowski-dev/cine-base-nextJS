"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAccountNav() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <ul className="hidden xs:flex  gap-3">
          <li>
            <Link
              className="p-2 xs:p-3 text-sm  text-white bg-red-700 hover:bg-red-800 rounded-lg"
              href={"/sign-in"}
              aria-label="Zaloguj się"
            >
              Zaloguj się
            </Link>
          </li>
          <li>
            <Link
              className="p-2 xs:p-3 text-sm  text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
              href={"/sign-up"}
              aria-label="Zarejestruj się"
            >
              Dołącz do nas
            </Link>
          </li>
        </ul>
      ) : (
        <Link
          href={"/dashboard"}
          className={`flex items-center justify-center border-2 border-transparent p-1 lg:hover:border-white  rounded-full`}
          aria-label="Zarządzaj swoim kontem"
        >
          {
            <Image
              className="rounded-full aspect-square"
              alt="user avatar"
              src={
                session?.user?.image
                  ? (session.user.image as string)
                  : "/no-profile-img.png"
              }
              width={35}
              height={35}
            />
          }
        </Link>
      )}
    </>
  );
}
