import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import UserLists from "./components/UserLists";
import UserSubscriptionInfo from "./components/UserSubscriptionInfo";
import UserProfile from "./components/UserProfile";
import { getUserName } from "../lib/api/userApi";
import UpdateSession from "../components/updateSession/UpdateSession";
import Welcome from "./components/Welcome";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");

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
        <Welcome
          email={session.user.email as string}
          username={session.user.name as string}
        />

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
