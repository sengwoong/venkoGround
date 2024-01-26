"use client";

import { toast } from "sonner";
import { useTransition } from "react";


import { Skeleton } from "@/components/ui/skeleton";
import { updateStream } from "@/actions/steam";
import * as Switch from '@radix-ui/react-switch';
import SwitchBtn from "@/components/switch-btn";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
};

export const ToggleCard = ({
  label,
  value = false,
  field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
       updateStream({ [field]: !value })
        .then(() => toast.success("Chat settings updated!"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">
          {label}
        </p>
        <div className="space-y-2">
            <SwitchBtn disabled={isPending}  onCheckedChange={onChange} checked={value} >
      
            </SwitchBtn>
           
        </div>
      </div>
    </div>
  );
};







export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className="rounded-xl p-10 w-full" />
  );
};