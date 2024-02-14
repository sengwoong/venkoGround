
import { Wrapper } from "./wrapper";

import { 
  Toggle, 
} from "./toggle";
import { OrgSidebar } from "@/app/(groups)/setting-group/_components/sidebar/org-sidebar";
import { useSidebar } from "@/app/store/use-sidebar";


export const Sidebar = async () => {


  return (
    <Wrapper>
        <Toggle></Toggle>
        <OrgSidebar />
    </Wrapper>
  );
};


