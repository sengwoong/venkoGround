
import { Wrapper } from "./wrapper";

import { 
  Toggle, 
} from "./toggle";

import { useSidebar } from "@/app/store/use-sidebar";
import { OrgSidebar } from "./org-sidebar";


export const Sidebar = async () => {


  return (
    <Wrapper>
        <Toggle></Toggle>
        <OrgSidebar />
    </Wrapper>
  );
};


