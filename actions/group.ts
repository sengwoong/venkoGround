"use server";

import { acceptGroupRequestAndAddUserToGroup, createGroup, leaveGroup, removeUserFromGroup } from "@/lib/group-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onCreate = async (title: string , self: User) => {
  try {
    const Group = await createGroup(title, self);
    revalidatePath("/setting-group");
    return Group;
  } catch (error) {
    console.error("그룹 생성 중 오류:", error);
    throw new Error("그룹 생성 중 오류 발생");
  }
};

export const removeCrewForGroup = async (groupId: string, userId: string, self: User): Promise<string> => {
  try {
    await removeUserFromGroup(groupId, userId, self);
    revalidatePath("/setting-group");
    return "사용자가 그룹에서 성공적으로 강퇴되었습니다";
  } catch (error) {
    console.error("그룹에서 사용자 강퇴 중 오류:", error);
    throw new Error("그룹에서 사용자 강퇴 중 오류 발생");
  }
};


export const handleAcceptGroupRequest = async (userId: string, groupId: string,self:User) => {
  "use server";
  try {
    await acceptGroupRequestAndAddUserToGroup(userId, groupId, self);
    revalidatePath("/setting-group");
    console.log('가입 요청이 성공적으로 수락되었습니다.');

  } catch (error) {
    console.error('가입 요청 수락 중 오류:', error);
  }
};





export const handleleaveGroup = async ( groupId: string,self:User) => {
  "use server";
  try {
    await leaveGroup( groupId, self);
    revalidatePath("/setting-group");
    console.log('가입 요청이 성공적으로 수락되었습니다.');

  } catch (error) {
    console.error('가입 요청 수락 중 오류:', error);
  }
};