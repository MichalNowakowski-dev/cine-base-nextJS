import FreeTrialCta from "../ui/FreeTrialCta";
import PageContainer from "../ui/PageContainer";
import SubscriptionPlan from "../ui/SubscriptionPlan/SubscriptionPlan";
import SubscriptionPlanInfo from "../ui/SubscriptionPlan/SubscriptionPlanInfo";

export default function Page() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-20 my-10">
        <SubscriptionPlan />
        <SubscriptionPlanInfo />
        <FreeTrialCta />
      </div>
    </PageContainer>
  );
}
