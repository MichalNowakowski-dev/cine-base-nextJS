import { auth } from "@/app/auth";
import SubscriptionCard from "../components/SubscriptionCard";
import { redirect } from "next/navigation";

const Subscriptions = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Twoja aktualna subskrypcja
      </h2>
      <SubscriptionCard />
      <div className="mt-6"></div>
    </div>
  );
};

export default Subscriptions;
