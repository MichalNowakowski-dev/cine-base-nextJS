import FreeTrialCta from "../ui/FreeTrialCta";
import SubscriptionPlan from "../ui/SubscriptionPlan/SubscriptionPlan";
import SubscriptionPlanInfo from "../ui/SubscriptionPlan/SubscriptionPlanInfo";

export default function Page() {
  return (
    <main className="min-h-screen mx-auto pt-24 md:pt-28 px-4 max-w-screen-xl">
      <div className="flex flex-col gap-20 my-10">
        <SubscriptionPlan />
        <SubscriptionPlanInfo />
        <FreeTrialCta />
      </div>
    </main>
  );
}
