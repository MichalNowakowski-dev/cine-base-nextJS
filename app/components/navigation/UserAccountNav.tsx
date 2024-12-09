"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAccountNav() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <ul className="flex gap-3">
          <li>
            <Link
              className="p-3 text-white bg-red-600 hover:bg-red-800 rounded-lg"
              href={"/sign-in"}
            >
              Zaloguj się
            </Link>
          </li>
          <li>
            <Link
              className="p-3 text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
              href={"/sign-up"}
            >
              Dołącz do nas
            </Link>
          </li>
        </ul>
      ) : (
        <Link
          href={"/dashboard"}
          className={`flex items-center justify-center border-2 border-transparent p-1 lg:hover:border-white  rounded-full`}
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
