import SubscriptionCard from "../components/SubscriptionCard";

const Subscriptions = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Twoja aktualna subskrypcja
      </h2>
      <SubscriptionCard />
      <div className="mt-6">
        <h3 className="text-xl">Wybierz nowy plan</h3>
        {/* Add subscription options here */}
      </div>
    </div>
  );
};

export default Subscriptions;
