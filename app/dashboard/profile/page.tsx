import { auth } from "@/app/auth";

import { redirect } from "next/navigation";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { prisma } from "@/app/prisma";
import UpdateSession from "@/app/components/updateSession/UpdateSession";
import { getUserName } from "@/app/lib/api/userApi";
import AvatarPicker from "../components/AvatarPicker";

const Profile = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const userName = await getUserName(Number(session.user.id));

  const userHashedPassword = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    select: {
      passwordHash: true,
    },
  });

  function maskPassword(password: string) {
    const maskedPassword = password.replace(/./g, "•");
    return maskedPassword;
  }

  return (
    <div>
      <UpdateSession />
      <h2 className="text-2xl font-semibold mb-4">Konto</h2>
      <section className="mb-10">
        <h3 className="mb-4">Szczegóły</h3>
        <ul>
          <li className="bg-[#18223165]  border-b border-white p-3 hover:bg-white/30 rounded-tl-lg rounded-tr-lg">
            <div className="flex justify-between mb-1 w-full">
              <h3>Adres e-mail</h3>
            </div>
            <p className="text-secondary">{session.user.email}</p>
          </li>
          <li className="bg-[#18223165]  border-b border-white p-3 hover:bg-white/30">
            <div className="flex justify-between mb-1 w-full">
              <h3>Hasło</h3>
              <Link href={"/dashboard/password"}>
                <FiEdit size={20} />
              </Link>
            </div>
            <p className="text-secondary">
              {userHashedPassword
                ? maskPassword("password")
                : "Brak ustawionego hasła"}
            </p>
          </li>
          <li className="p-3 bg-[#18223165] hover:bg-white/30  rounded-bl-lg rounded-br-lg">
            <div className="flex justify-between mb-1 w-full">
              <h3>Nazwa</h3>
              <Link href={"/dashboard/name"}>
                <FiEdit size={20} />
              </Link>
            </div>
            <p className="text-secondary">{userName}</p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Zmien swój awatar</h2>
        <AvatarPicker />
      </section>
    </div>
  );
};

export default Profile;
