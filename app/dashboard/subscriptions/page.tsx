import SubscriptionCard from "../components/SubscriptionCard";

const Subscriptions = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Current Subscription</h2>
      <SubscriptionCard />
      <div className="mt-6">
        <h3 className="text-xl">Choose a new subscription</h3>
        {/* Add subscription options here */}
      </div>
    </div>
  );
};

export default Subscriptions;
