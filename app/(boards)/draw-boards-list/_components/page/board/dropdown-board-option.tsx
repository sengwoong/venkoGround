"use client";

import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


import { Button } from "@/components/ui/button";

import { ConfirmModal } from "@/modals/confirm-modal";
import { useRenameModal } from "@/app/store/use-rename-modal";
import { deleteBoard } from "@/lib/boards-service";
import { User } from "@/type/userType";
import { handleAddBoardDelect } from "@/actions/board";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  boardId:string;
  self:User;
};

export const DropdownBoardOption = ({
  children,
  side,
  sideOffset,
  id,
  title,
  boardId,
  self,
}: ActionsProps) => {
  const { onOpen ,setSelf} = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${boardId}`,
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  };

  const onDelete =()=>{
    handleAddBoardDelect(boardId,self)
    // 지우기 실행
  }

  const onModal=(boardId:string, title:string)=>{
    setSelf(self)
    onOpen(boardId, title)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onModal(boardId, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
