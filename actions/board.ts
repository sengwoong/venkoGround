"use server";

import { addBoardToGroup, deleteBoard, updateBoard } from "@/lib/boards-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const handleAddBoardToGroup = async (groupId: string, title: string, img: string, self: User) => {
    try {
    await addBoardToGroup(groupId, title, img,self);
    revalidatePath("/");
    } catch (error) {
    console.log(error)
    }
}

export const handleAddBoardDelect = async (groupId: string, self: User) => {
    "use server"
    try {
    await deleteBoard(groupId,self);
    revalidatePath("/");
    } catch (error) {
    console.log(error)
    }
}

export const handleRenameModal= async (boardId: string, newTitle: string|null, newImg: string|null, self: User|undefined) => {
    "use server"
    try {
    if(self == undefined){
        return
        }
    await updateBoard(boardId,newTitle,newImg,self);
    revalidatePath("/");
    } catch (error) {
    console.log(error)
    }
}