"use server";

import { addBoardToGroup, deleteBoard, isBoardInUserGroup, updateBoard } from "@/lib/boards-service";
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

//isBoardInUserGroup 을활용해서 만들기


export const handleBoardInUserGroup= async(boardId: string, userId: string)=>{
    "use server"
    try {
    await isBoardInUserGroup(boardId,userId);
    revalidatePath("/");
    } catch (error) {
    console.log(error)
    }
}
