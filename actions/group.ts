"use server";

import { acceptGroupRequestAndAddUserToGroup, changeGroupLeader, createGroup, leaveGroup, removeUserFromGroup, viewAllGroups, viewMyGroups } from "@/lib/group-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onCreate = async (title: string , self: User,path:string) => {
  try {
    const Group = await createGroup(title, self);

    revalidatePath("/setting-group?"+path);
    return Group;
  } catch (error) {
    console.error("그룹 생성 중 오류:", error);
    throw new Error("그룹 생성 중 오류 발생");
  }
};

export const removeCrewForGroup = async (groupId: string, userId: string, self: User,path:string): Promise<string> => {
  try {
    await removeUserFromGroup(groupId, userId, self);
    revalidatePath("/setting-group?"+path);
    return "사용자가 그룹에서 성공적으로 강퇴되었습니다";
  } catch (error) {
    console.error("그룹에서 사용자 강퇴 중 오류:", error);
    throw new Error("그룹에서 사용자 강퇴 중 오류 발생");
  }
};


export const handleAcceptGroupRequest = async (userId: string, groupId: string,self:User,path:string) => {
  "use server";
  try {
    await acceptGroupRequestAndAddUserToGroup(userId, groupId, self);
    revalidatePath("/setting-group?"+path);
    console.log('가입 요청이 성공적으로 수락되었습니다.');

  } catch (error) {
    console.error('가입 요청 수락 중 오류:', error);
  }
};





export const handleLeaveGroup = async ( groupId: string,self:User,path:string) => {
  "use server";
  try {
    await leaveGroup( groupId, self);
    revalidatePath("/setting-group?"+path);
    console.log('가입 요청이 성공적으로 수락되었습니다.');

  } catch (error) {
    console.error('가입 요청 수락 중 오류:', error);
  }
};


export const handleChangeGroupLeader = async (newLeaderId: string, groupId: string, self: User,path:string) => {
  "use server";
  try {

    await changeGroupLeader(newLeaderId, groupId, self);

    revalidatePath("/setting-group?"+path);
  } catch (error) {
    console.error("그룹 파티장 변경 중 오류:", error);

  }
};

