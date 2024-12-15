import PageContainer from "../components/ui/pageContainer/PageContainer";
import FallingSnow from "./components/FallingSnow";
import Sidebar from "./components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTodayWinter = new Date().getMonth() === 11 || 0 || 1;

  return (
    <PageContainer className="relative min-h-screen bg-star-gradient overflow-hidden !max-w-[100%]">
      <div className="absolute inset-0 bg-stars"></div>
      {isTodayWinter && <FallingSnow count={35} />}
      <Sidebar>{children}</Sidebar>
    </PageContainer>
  );
}
