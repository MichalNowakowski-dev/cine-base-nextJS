import Link from "next/link";

const SubscriptionCard = () => {
  return (
    <div className="p-6 bg-gray-700 text-white rounded-lg shadow-lg">
      <h3 className="text-xl">Aktualny plan: </h3>
      <p>Wygasa: </p>
      <Link
        href={"/plans"}
        className="block w-max mt-4 p-2 bg-blue-600 text-white rounded"
      >
        Zmień plan
      </Link>
    </div>
  );
};

export default SubscriptionCard;
