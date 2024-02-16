
import { OrgSidebar } from "@/app/(groups)/setting-group/_components/sidebar/org-sidebar";
import { Navbar } from "./_components/navbar";
import { Wrapper } from "./_components/sidebar/wrapper";
import { Toggle } from "./_components/sidebar/toggle";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";



interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    
    <main className="h-full">
        <Navbar />
        <div className="flex min-h-screen h-max">
        <Container>
          <Sidebar/>
        </Container>
        <div className="h-full w-full">
            {children}
        </div>
        </div>
    </main>
  );
};

export default DashboardLayout;
