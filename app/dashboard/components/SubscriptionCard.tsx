const SubscriptionCard = () => {
  return (
    <div className="p-6 bg-gray-700 text-white rounded-lg shadow-lg">
      <h3 className="text-xl">Aktualny plan: </h3>
      <p>Wygasa: </p>
      <button className="mt-4 p-2 bg-blue-600 text-white rounded">
        Zmień plan
      </button>
    </div>
  );
};

export default SubscriptionCard;
