import PageContainer from "../components/ui/pageContainer/PageContainer";
import Sidebar from "./components/Sidebar";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageContainer>
        <Sidebar>{children}</Sidebar>
      </PageContainer>
    </>
  );
}
