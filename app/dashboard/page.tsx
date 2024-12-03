import UpdateSession from "../components/updateSession/UpdateSession";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  console.log(session.user);

  return (
    <div>
      <UpdateSession />

      <div className="space-y-6">
        {/* Welcome message */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-white">
            Witaj ponownie {session.user.name?.split(" ")[0]}
          </h1>
          <p className="text-gray-300 mt-2">
            Here’s an overview of your account and subscription.
          </p>
        </div>

        {/* Subscription Overview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">
            Your Subscription
          </h2>
          <p className="text-gray-300 mt-2">
            Current Plan: <span className="font-bold">Premium</span>
          </p>
          <p className="text-gray-300">
            Expires on: <span className="font-bold">December 31, 2024</span>
          </p>
          <button className="mt-4 p-2 bg-blue-600 text-white rounded">
            Manage Subscription
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Your Profile</h2>
          <p className="text-gray-300 mt-2">
            Name: <span className="font-bold">John Doe</span>
          </p>
          <p className="text-gray-300">
            Email: <span className="font-bold">john.doe@example.com</span>
          </p>
          <button className="mt-4 p-2 bg-green-600 text-white rounded">
            Edit Profile
          </button>
        </div>

        {/* Movie Lists */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Your Lists</h2>
          <p className="text-gray-300 mt-2">
            Favorite Movies: <span className="font-bold">15</span>
          </p>
          <p className="text-gray-300">
            Watchlist: <span className="font-bold">5</span>
          </p>
          <button className="mt-4 p-2 bg-purple-600 text-white rounded">
            Manage Lists
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
