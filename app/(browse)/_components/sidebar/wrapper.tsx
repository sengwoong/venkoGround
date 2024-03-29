"use client";

import { useIsClient } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/app/store/use-sidebar";
import { ToggleMiniSkeleton, ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className=" left-0 flex flex-col w-[70px] lg:w-60 h-full min-h-screen bg-background border-r border-[#2D2E35] z-50">
        {collapsed?(<ToggleMiniSkeleton/> ):(<ToggleSkeleton />)}
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "left-0 flex flex-col w-60 h-full min-h-screen bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
