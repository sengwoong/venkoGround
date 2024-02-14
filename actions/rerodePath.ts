"use server"
import { revalidatePath } from "next/cache";

export const reFetchSettingGroup = async (path: string) => {
    try {

      revalidatePath("/setting-group?"+path);

     
    } catch (error) {
      throw new Error("Interal Error");
    };
  };