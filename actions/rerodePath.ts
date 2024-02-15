"use server"
import { revalidatePath } from "next/cache";

export const reFetchSettingGroup = async (path: string) => {
    try {
      console.log("reFetchSettingGrouppath")
      console.log("reFetchSettingGrouppath")
      console.log("reFetchSettingGrouppath")
      console.log("reFetchSettingGrouppath")
console.log(path)
      revalidatePath("/setting-group?"+path);

     
    } catch (error) {
      throw new Error("Interal Error");
    };
  };