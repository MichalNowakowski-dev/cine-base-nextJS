import FallingSnow from "./components/FallingSnow";
import Sidebar from "./components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTodayWinter = new Date().getMonth() === 11 || 0 || 1;

  return (
    <div className="mx-auto pt-24 md:pt-28 px-4 relative bg-star-gradient overflow-hidden max-w-[100%]">
      <div className="absolute inset-0 bg-stars"></div>
      {isTodayWinter && <FallingSnow count={35} />}
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
