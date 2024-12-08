"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAccountNav() {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return (
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
  );
}
