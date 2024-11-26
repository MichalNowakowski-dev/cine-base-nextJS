import FreeTrialCta from "../components/ui/freeTrialCta/FreeTrialCta";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import SubscriptionPlan from "./SubscriptionPlan/SubscriptionPlan";
import SubscriptionPlanInfo from "./SubscriptionPlan/SubscriptionPlanInfo";

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
