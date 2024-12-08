import { auth } from "@/app/auth";

import { prisma } from "../prisma";
import UserLists from "./components/UserLists";
import UserSubscriptionInfo from "./components/UserSubscriptionInfo";
import UserProfile from "./components/UserProfile";
import { getUserName } from "../lib/api/userApi";
import UpdateSession from "../components/updateSession/UpdateSession";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) return;

  const userName = await getUserName(Number(session.user.id));

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
  const userListsLength = {
    favoriteMovies: userInfo?.favoriteMovies.length,
    favoriteShows: userInfo?.favoriteShows.length,
    toWatchMovies: userInfo?.toWatchMovies.length,
    toWatchShows: userInfo?.toWatchShows.length,
  };

  return (
    <div>
      <UpdateSession />
      <div className="space-y-6">
        <div className="bg-backgroundDashboardCard p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-white">
            Witaj ponownie{" "}
            {session.user.name?.split(" ")[0] || session.user.email}
          </h1>
          <p className="text-gray-300 mt-2">
            Mozesz tutaj zarządzać swoimi subskrypcjami oraz profilem.
          </p>
        </div>

        <UserSubscriptionInfo session={session} />

        <UserProfile
          userEmail={session.user.email as string}
          username={userName}
        />
        <UserLists userListsLength={userListsLength} />
      </div>
    </div>
  );
};

export default DashboardPage;
