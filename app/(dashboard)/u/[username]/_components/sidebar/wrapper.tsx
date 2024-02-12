"use client";

import { useCreatorSidebar } from "@/app/store/use-creator-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
 console.log()
  return (
    <aside className={cn(
      " left-0 flex flex-col w-20 h-full bg-background border-r border-[#2D2E35] z-50",
      !collapsed && "w-72"  
    )}>
      {children}
    </aside>
  );
};
