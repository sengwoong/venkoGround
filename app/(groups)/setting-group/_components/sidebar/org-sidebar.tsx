"use client"
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/app/store/use-sidebar";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const MyGroup = searchParams.get("MyGroup");
  const { collapsed } = useSidebar((state) => state);

  return (
    <div className={`${collapsed ? 'w-full  ' : 'lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'}`}>
      
      <div className="flex flex-col space-y-1 w-full ">
        <Button
          variant={MyGroup ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal  px-2 w-full"
        >
          <Link href="/setting-group">
            <LayoutDashboard className="h-6 w-6 " />
            {!collapsed ? "Groups":""}
          </Link>
        </Button>
        {collapsed ? (<div className="mt-12"></div>):(<></>)}  
        <Button
          variant={MyGroup ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal  px-2 w-full"
        >
          <Link href={{
            pathname: "/setting-group",
            query: { MyGroup: true }
          }}>
            <Star className="h-6 w-6" />
            {!collapsed ? "My Group":""}
          
          </Link>
        </Button>
      </div>
    </div>
  );
};
