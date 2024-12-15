import Accordion from "@/app/components/ui/accordion/Accordion";
import UserPanel from "./UserPanel";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    { href: "/dashboard", label: "Panel" },
    { href: "/dashboard/subscriptions", label: "Plan subskrypcji" },
    { href: "/dashboard/profile", label: "Edytuj profil" },
    { href: "/dashboard/lists", label: "Moje listy" },
    { href: "/dashboard/ratings", label: "Ocenione filmy/seriale" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen  text-gray-200 rounded-lg relative z-10 max-w-screen-xl mx-auto">
      <aside className="w-full md:w-1/4 p-6 md:min-h-screen">
        <h2 className="hidden md:block text-xl font-semibold mb-6 text-center md:text-left">
          Panel użytkownika
        </h2>
        <UserPanel className="hidden md:block" links={links} />

        <Accordion className="md:hidden" title="Panel użytkownika">
          <UserPanel links={links} />
        </Accordion>
      </aside>

      <main className="w-full md:w-3/4 p-2 md:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
