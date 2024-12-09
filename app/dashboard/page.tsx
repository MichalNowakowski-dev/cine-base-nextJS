import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import UserLists from "./components/UserLists";
import UserSubscriptionInfo from "./components/UserSubscriptionInfo";
import UserProfile from "./components/UserProfile";
import UpdateSession from "../components/updateSession/UpdateSession";
import Welcome from "./components/Welcome";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");

  return (
    <div>
      <UpdateSession />
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        <Welcome
          email={session.user.email as string}
          username={session.user.name as string}
        />

        <UserSubscriptionInfo session={session} />

        <UserProfile
          userEmail={session.user.email as string}
          username={session.user.name as string}
        />
        <UserLists session={session} />
      </div>
    </div>
  );
};

export default DashboardPage;
