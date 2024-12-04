import FreeTrialCta from "../components/ui/freeTrialCta/FreeTrialCta";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import { prisma } from "../prisma";
import SubscriptionPlan from "./SubscriptionPlan/SubscriptionPlan";
import SubscriptionPlanInfo from "./SubscriptionPlan/SubscriptionPlanInfo";

export default async function Page() {
  const plans = await prisma.plan.findMany();
  return (
    <PageContainer>
      <div className="flex flex-col gap-20 my-10">
        <SubscriptionPlan plansData={plans} />
        <SubscriptionPlanInfo plansData={plans} />
        <FreeTrialCta />
      </div>
    </PageContainer>
  );
}
