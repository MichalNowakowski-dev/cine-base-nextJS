import { auth } from "@/app/auth";
import SubscriptionCard from "../components/SubscriptionCard";
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
      <SubscriptionCard />
      <div className="my-6"></div>
      <SubscriptionHistory subscriptionHistoryList={userSubscriptionHistory} />
    </div>
  );
};

export default Subscriptions;
