"use client";


import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownBoardOption } from "./dropdown-board-option";
import { Overlay } from "@/components/ui/overlay";
import CardWapper from "../../card/_component/cardWapper";
import Image from "next/image";
import { Board } from "@/type/boardType";
import { User } from "@/type/userType";


interface BoardCardProps {
  id: string;
  board: Board|null;
  self: User
};

export const BoardCard = ({
  id,
  board,
  self
}: BoardCardProps) => { 

console.log(board)
if(board == null){
  return 
}

const {title,img,groupId} = board;
  return (
    <CardWapper>
   

      <div className="relative flex-1 h-full w-full">
      <Overlay />
          <DropdownBoardOption
            id={id}
            title={title}
            side="right"
            self={self}
            boardId={board.id}
          >
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none
              z-50
              "
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </DropdownBoardOption>
          <Link href={`/drawing/${board.id}`} className="w-full h-full">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="p-4">
              <div className="text-center">클릭시 {title} 을 실행합니다!</div>
              <Image src={img}  alt="이미지" width={200}  height={200}></Image>
              {/* 다른 컨텐츠를 여기에 추가할 수 있습니다 */}
            </div>
          </div>
          </Link>
          </div>
          

    </CardWapper>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
