const SubscriptionCard = () => {
  return (
    <div className="p-6 bg-gray-700 text-white rounded-lg shadow-lg">
      <h3 className="text-xl">Current Plan: </h3>
      <p>Expires on: </p>
      <button className="mt-4 p-2 bg-blue-600 text-white rounded">
        Change Plan
      </button>
    </div>
  );
};

export default SubscriptionCard;
