import UpdateSession from "../components/updateSession/UpdateSession";
import { auth } from "@/app/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const userInfo = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    include: {
      favoriteMovies: {
        where: {
          userId: Number(session.user.id),
        },
      },
      favoriteShows: {
        where: {
          userId: Number(session.user.id),
        },
      },
      toWatchMovies: {
        where: {
          userId: Number(session.user.id),
        },
      },
      toWatchShows: {
        where: {
          userId: Number(session.user.id),
        },
      },
    },
  });

  return (
    <div>
      <UpdateSession />

      <div className="space-y-6">
        {/* Welcome message */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-white">
            Witaj ponownie{" "}
            {session.user.name?.split(" ")[0] || session.user.email}
          </h1>
          <p className="text-gray-300 mt-2">
            Mozesz tutaj zarządzać swoimi subskrypcjami oraz profilem.
          </p>
        </div>

        {/* Subscription Overview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">
            Twoje subskrypcje
          </h2>
          <p className="text-gray-300 mt-2">
            Aktywny plan:{" "}
            <span className="font-bold">
              {session.user.plan?.name || "Brak"}
            </span>
          </p>
          <p className="text-gray-300">
            Wygasa:{" "}
            <span className="font-bold">
              {session.user.subscriptionEnd
                ? new Date(
                    session.user.subscriptionEnd as Date
                  ).toLocaleDateString("pl-PL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Brak"}
            </span>
          </p>
          <Link
            href={"/dashboard/subscriptions"}
            className="block w-max mt-4 p-2 bg-blue-600 text-white rounded"
          >
            Zarządzaj subskrypcjami
          </Link>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Twój profil</h2>
          <p className="text-gray-300 mt-2">
            Imię i nazwisko:{" "}
            <span className="font-bold">{userInfo?.name || "Brak danych"}</span>
          </p>
          <p className="text-gray-300">
            Email: <span className="font-bold">{userInfo?.email}</span>
          </p>
          <Link
            href={"/dashboard/profile"}
            className=" block w-max mt-4 p-2 bg-green-600 text-white rounded"
          >
            Edytuj Profil
          </Link>
        </div>

        {/* Movie Lists */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Twoje listy</h2>
          <p className="text-gray-300 mt-2">
            Ulubione filmy:{" "}
            <span className="font-bold">{userInfo?.favoriteMovies.length}</span>
          </p>
          <p className="text-gray-300 mt-2">
            Ulubione seriale:{" "}
            <span className="font-bold">{userInfo?.favoriteShows.length}</span>
          </p>
          <p className="text-gray-300 mt-2">
            Filmy do obejrzenia:{" "}
            <span className="font-bold">{userInfo?.toWatchMovies.length}</span>
          </p>
          <p className="text-gray-300 mt-2">
            Seriale do obejrzenia:{" "}
            <span className="font-bold">{userInfo?.toWatchShows.length}</span>
          </p>
          <Link
            href={"/dashboard/lists"}
            className=" block w-max mt-4 p-2 bg-purple-600 text-white rounded"
          >
            Pokaż listy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
