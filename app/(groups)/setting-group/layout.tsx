
import { OrgSidebar } from "@/app/(groups)/setting-group/_components/sidebar/org-sidebar";
import { Navbar } from "./_components/navbar";
import { Wrapper } from "./_components/sidebar/wrapper";
import { Toggle } from "./_components/sidebar/toggle";
import { Sidebar } from "./_components/sidebar";



interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    
    <main className="h-full">
        <Navbar />
        <Sidebar/>
          <div className="h-full w-full flex-1">
          
            {children}
          </div>
      
    </main>
  );
};

export default DashboardLayout;
