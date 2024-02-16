"use server";

import { addBoardToGroup } from "@/lib/boards-service";
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