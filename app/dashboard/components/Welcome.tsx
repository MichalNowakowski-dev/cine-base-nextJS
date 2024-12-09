export default function Welcome({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  return (
    <div className="bg-backgroundDashboardCard p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-white">
        Witaj ponownie {username?.split(" ")[0] || email || ""}
      </h1>
      <p className="text-gray-300 mt-2">
        Mozesz tutaj zarządzać swoimi subskrypcjami oraz profilem.
      </p>
    </div>
  );
}
