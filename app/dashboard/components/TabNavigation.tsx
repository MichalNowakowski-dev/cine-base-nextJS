const TabNavigation = () => {
  return (
    <div className="mb-6">
      <ul className="flex space-x-4">
        <li>
          <a href="/dashboard" className="text-lg">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/dashboard/subscriptions" className="text-lg">
            Subscriptions
          </a>
        </li>
        <li>
          <a href="/dashboard/profile" className="text-lg">
            Profile
          </a>
        </li>
        <li>
          <a href="/dashboard/password" className="text-lg">
            Password
          </a>
        </li>
        <li>
          <a href="/dashboard/lists" className="text-lg">
            My Lists
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TabNavigation;
