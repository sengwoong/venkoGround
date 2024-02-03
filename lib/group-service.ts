import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

// 그룹 생성
export const createGroup = async (groupTitle: string) => {
  const self = await getSelf();

  try {
    // 새 그룹 생성
    const newGroup = await db.group.create({
      data: {
        grouptitle: groupTitle,
        leader: self.id,
        user: self.id,
        membershipstatus: true, // 생성자는 자동으로 멤버가 되는 것으로 가정
      },
    });

    return `그룹 "${groupTitle}"이(가) 성공적으로 생성되었습니다. ID: ${newGroup.id}`;
  } catch (error) {
    console.error("그룹 생성 중 오류:", error);
    throw new Error("그룹 생성 중 오류 발생");
  }
};

// 그룹에 가입하기
export const requestToJoinGroup = async (groupId: string) => {
  const self = await getSelf();

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error("그룹을 찾을 수 없습니다");
    }

    // 이미 가입 신청 중인지 확인
    const existingRequest = await db.group.findFirst({
      where: {
        id: groupId,
        user: self.id,
        membershipstatus: false,
      },
    });

    if (existingRequest) {
      throw new Error("이미 이 그룹에 가입을 요청했습니다");
    }

    // 가입 신청 생성
    await db.group.create({
      data: {
        id: groupId,
        user: self.id,
        grouptitle: group.grouptitle,
        leader: group.leader,
        membershipstatus: false,
      },
    });

    return "가입 요청이 성공적으로 전송되었습니다";
  } catch (error) {
    console.error("그룹 가입 요청 중 오류:", error);
    throw new Error("그룹 가입 요청 중 오류 발생");
  }
};

// 그룹에 초대하기
export const inviteToGroup = async (inviterId: string, invitedUserId: string, groupId: string) => {
  const self = await getSelf();

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error("그룹을 찾을 수 없습니다");
    }

    if (!group.user.includes(self.id)) {
      throw new Error("사용자 그룹이 아닙니다");
    }

    // 이미 초대 중인지 확인
    const existingInvitation = await db.group.findFirst({
      where: {
        id: groupId,
        user: invitedUserId,
      },
    });

    if (existingInvitation) {
      throw new Error("이미 이 그룹에 초대되었습니다");
    }

    // 초대 생성
    await db.personalNotification.create({
      data: {
        userId: groupId,
        content: invitedUserId,
        type: "invite",
      },
    });

    return "초대가 성공적으로 전송되었습니다";
  } catch (error) {
    console.error("그룹 초대 중 오류:", error);
    throw new Error("그룹 초대 중 오류 발생");
  }
};

// 그룹 가입 요청 수락하기
export const acceptGroupRequest = async (userId: string, requestId: string) => {
  try {
    const request = await db.group.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new Error("요청을 찾을 수 없습니다");
    }

    const self = await getSelf();

    // 리더가 아닌 사용자가 요청을 수락할 수 없음
    if (request.leader !== self.id) {
      throw new Error("사용자는 리더가 아닙니다");
    }

    // 가입 신청 승인
    await db.group.update({
      where: {
        id: requestId,
        user: userId,
      },
      data: { membershipstatus: true },
    });

    return "그룹 가입 요청이 성공적으로 수락되었습니다";
  } catch (error) {
    console.error("그룹 가입 요청 수락 중 오류:", error);
    throw new Error("그룹 가입 요청 수락 중 오류 발생");
  }
};