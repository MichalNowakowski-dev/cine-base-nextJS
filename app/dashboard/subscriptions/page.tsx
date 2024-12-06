import SubscriptionCard from "../components/SubscriptionCard";

const Subscriptions = () => {
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
