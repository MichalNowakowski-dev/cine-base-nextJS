import PageContainer from "../components/ui/pageContainer/PageContainer";
import FallingStars from "./components/FallingStars";
import Sidebar from "./components/Sidebar";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="relative min-h-screen bg-star-gradient overflow-hidden !max-w-[100%]">
      <div className="absolute inset-0 bg-stars"></div>

      <FallingStars count={35} />

      <Sidebar>{children}</Sidebar>
    </PageContainer>
  );
}
