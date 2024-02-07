
import { Navbar } from "@/app/(browse)/_components/navbar";
import { Toggle } from "@/app/(browse)/_components/sidebar/toggle";
import { Wrapper } from "@/app/(browse)/_components/sidebar/wrapper";
import { OrgSidebar } from "@/components/org-sidebar";


interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    
    <main className="h-full">
          <Navbar />
  <Wrapper>
        <Toggle></Toggle>
        <OrgSidebar />
        </Wrapper>
  
          <div className="h-full w-full flex-1">
          
            {children}
          </div>
      
    </main>
  );
};

export default DashboardLayout;
