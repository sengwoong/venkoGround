"use client"

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/app/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageNation } from "@/app/store/use-pagenation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const MyGroup = searchParams.get("MyGroup");
  const { collapsed } = useSidebar((state) => state);
  const { setPage } = usePageNation();

  const setPageToOne = () => {
    setPage(1);
  };

  return (
    <div className={`${collapsed ? 'w-full' : 'lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 p-3'}`}>
      <div className="flex flex-col space-y-1 w-full ">
        <Button
          variant={MyGroup ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal  px-2 w-full"
          onClick={setPageToOne}
        >
          <Link href={{
            pathname: "/setting-group",
            query: { page: 1 }
          }}>
            <LayoutDashboard className="h-6 w-6" />
            {!collapsed ? "Groups" : ""}
          </Link>
        </Button>
        {collapsed ? (<div className="mt-12"></div>) : (<></>)}
        <Button
          variant={MyGroup ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal  px-2 w-full"
          onClick={setPageToOne}
        >
          <Link href={{
            pathname: "/setting-group",
            query: { MyGroup: true, page: 1 }
          }}>
            <Star className="h-6 w-6" />
            {!collapsed ? "My Group" : ""}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 lg:flex items-center justify-center w-full">
      <Skeleton className="h-7 w-7 p-2 mr-1" />
      <Skeleton className="h-6 w-[100px] p-2" />
    </div>
  );
};

export const ToggleMiniSkeleton = () => {
  return (
    <div className=" pl-6 lg:flex items-center justify-center w-full">
      <Skeleton className="h-8 w-8 p-2" />
    </div>
  );
};
