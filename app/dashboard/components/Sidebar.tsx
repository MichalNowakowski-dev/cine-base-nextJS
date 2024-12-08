import { ReactNode } from "react";
import Link from "next/link";
import SignOut from "@/app/components/navigation/SignOut";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const links = [
    { href: "/dashboard", label: "Panel" },
    { href: "/dashboard/subscriptions", label: "Plan subskrypcji" },
    { href: "/dashboard/profile", label: "Profil" },
    { href: "/dashboard/lists", label: "Moje listy" },
    { href: "/dashboard/ratings", label: "Ocenione filmy/seriale" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen  text-gray-200 rounded-lg relative z-10 max-w-screen-xl mx-auto">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4  p-6 md:min-h-screen">
        <h2 className="text-xl font-semibold mb-6 text-center md:text-left">
          Panel użytkownika
        </h2>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 px-4 rounded transition text-white hover:bg-gray-700`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="">
            <div className="h-[2px] bg-white w-full"></div>
            <SignOut className="w-full py-2 my-2 px-4 rounded transition text-white hover:bg-gray-700" />
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-2 md:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
