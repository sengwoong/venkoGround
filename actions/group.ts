"use server";

import { createGroup } from "@/lib/group-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";




export const onCreate = async (title: string ,self:User) => {

  const Group = await createGroup(title, self)



  revalidatePath("/setting-group");



  return Group;
};
