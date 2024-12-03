import { ReactNode } from "react";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/subscriptions", label: "Subscriptions" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/dashboard/password", label: "Change Password" },
    { href: "/dashboard/lists", label: "My Lists" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-6">User Dashboard</h2>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 px-4 rounded transition  text-white hover:bg-gray-700`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
