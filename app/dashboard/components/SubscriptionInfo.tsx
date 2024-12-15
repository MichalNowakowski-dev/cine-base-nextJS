import { auth } from "@/app/auth";
import { getUserSubscriptionInfo } from "@/app/lib/actions/user/userActions";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

const SubscriptionInfo = async () => {
  const session = await auth();
  const userSubscriptionInfo = await getUserSubscriptionInfo(
    Number(session?.user.id)
  );
  const isMonthly = userSubscriptionInfo?.interval === "month";
  const paymentTimeleft =
    (userSubscriptionInfo?.subscriptionEnd.getTime() as number) -
    new Date().getTime();
  const paymentTimeLeftInDays = Number(
    (paymentTimeleft / (1000 * 60 * 60 * 24)).toFixed(0)
  );

  const paymentTimeLeftMessage =
    paymentTimeLeftInDays === 1
      ? `Twoja następna płatność będzie za ${Math.ceil(
          paymentTimeLeftInDays
        )} dzień.`
      : `Twoja następna płatność będzie za ${Math.ceil(
          paymentTimeLeftInDays
        )} dni.`;

  return (
    <div className=" text-white mb-10">
      <div className=" bg-backgroundDashboardCard  border-b border-white">
        <p className="text-sm uppercase text-black bg-white/70 rounded-tl-lg rounded-tr-lg pl-4">
          Bieżący plan
        </p>
        <div className="p-4 ">
          <h2 className=" text-h2 uppercase">
            {userSubscriptionInfo?.plan.name || "Brak wykupionego planu"}
          </h2>
          {userSubscriptionInfo && (
            <h3 className="text-h3">
              {isMonthly
                ? userSubscriptionInfo?.plan.monthlyPrice
                : userSubscriptionInfo?.plan.yearlyPrice}
              zł
              <span className="text-secondary text-sm">
                {isMonthly ? "/miesiąc" : "/rok"}
              </span>
            </h3>
          )}
        </div>
      </div>
      <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
        <p className=" text-lg ">Zbliżające się płatności</p>
        <p className="text-lg">
          {userSubscriptionInfo?.status === "active"
            ? paymentTimeLeftMessage
            : "Brak bliżających się płatności"}
        </p>
      </div>
      {userSubscriptionInfo && (
        <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
          <p className=" text-lg ">Status planu</p>
          <p className="text-lg">
            {userSubscriptionInfo?.stripeSubscriptionId &&
            userSubscriptionInfo?.status === "active"
              ? "Aktywny"
              : "Anulowany - Dostęp do końca okresu"}
          </p>
        </div>
      )}

      <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
        <div className="flex justify-between w-full">
          <p className=" text-lg ">Zmień pakiet</p>
          <Link href={"/plans"}>
            <FaChevronRight size={20} />
          </Link>
        </div>
        <p className="text-lg">
          {userSubscriptionInfo?.plan.name
            ? `${userSubscriptionInfo?.plan.name} - ${
                isMonthly ? "miesięczny" : "roczny"
              }`
            : "Brak aktywnego planu "}
        </p>
      </div>
      {userSubscriptionInfo?.stripeSubscriptionId && (
        <div className="p-4 bg-backgroundDashboardCard  border-b border-white">
          <CancelSubscriptionModal
            stripeSubscriptionId={userSubscriptionInfo?.stripeSubscriptionId}
          />
        </div>
      )}
    </div>
  );
};

export default SubscriptionInfo;
