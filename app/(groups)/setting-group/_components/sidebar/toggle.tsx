"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/app/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse
  } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className=" flex flex-col w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant="ghost" 
              className="h-auto p-2 "  
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">
            Your Group
          </p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto" 
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 lg:flex items-center justify-center w-full">
      <Skeleton className="h-8 w-8 p-2" />
      <Skeleton className="h-6 w-[100px] p-2" />
    </div>
  );
};
