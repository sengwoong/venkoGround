
import { Wrapper } from "./wrapper";

import { 
  Toggle, 
  ToggleSkeleton
} from "./toggle";
import { OrgSidebar } from "@/app/(groups)/setting-group/_components/sidebar/org-sidebar";


export const Sidebar = async () => {


  return (
    <Wrapper>
        <Toggle></Toggle>
        <OrgSidebar />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
    </aside>
  );
};
