import { auth } from "@/app/auth";
import SubscriptionInfo from "../components/SubscriptionInfo";
import { redirect } from "next/navigation";
import SubscriptionHistory from "../components/SubscriptionHistory";
import { getUserSubscriptionHistory } from "@/app/lib/api/userApi";

const Subscriptions = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const userSubscriptionHistory = await getUserSubscriptionHistory(
    Number(session.user.id)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Twoja aktualna subskrypcja
      </h2>
      <SubscriptionInfo />

      <SubscriptionHistory subscriptionHistoryList={userSubscriptionHistory} />
    </div>
  );
};

export default Subscriptions;
