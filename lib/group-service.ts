// group-service.ts

import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

enum typeProps {
  leader = "leader",
  student = "student"
}

/**
 * 새로운 그룹을 생성하는 함수
 * @param {string} grouptitle - 생성할 그룹의 제목
 * @returns {Promise<string>} - 그룹 생성 결과 메시지
 */
export const createGroup = async (grouptitle: string): Promise<string> => {
    console.log("Before getSelf()"); // Log before calling getSelf()
    
    const self = await getSelf();

  
    try {
      console.log("Inside try block");
      
      // Rest of your code
      const newGroup = await db.group.create({
        data: {
          grouptitle,
          leader: self.id,
        },
      });
  
      console.log("Group created successfully");
      return "그룹이 성공적으로 생성되었습니다";
    } catch (error) {
      console.error("그룹 생성 중 오류:", error);
      throw new Error("그룹 생성 중 오류 발생");
    }
  };
  

/**
 * 그룹에 가입하는 함수
 * @param {string} groupId - 가입할 그룹의 ID
 * @returns {Promise<string>} - 가입 결과 메시지
 */
export const requestToJoinGroup = async (groupId: string): Promise<string> => {
  const self = await getSelf();

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error("그룹을 찾을 수 없습니다");
    }

    // 이미 가입 신청 중인지 확인
    const existingRequest = await db.groupApplication.findFirst({
      where: {
        groupId: groupId,
        userId: self.id,
      },
    });

    if (existingRequest) {
      throw new Error("이미 이 그룹에 가입을 요청했습니다");
    }

    // 가입 신청 생성
    await db.groupApplication.create({
      data: {
        groupId: groupId,
        status: false,
        userId: self.id,
      },
    });

    return "가입 요청이 성공적으로 전송되었습니다";
  } catch (error) {
    console.error("그룹 가입 요청 중 오류:", error);
    throw new Error("그룹 가입 요청 중 오류 발생");
  }
};

/**
 * 그룹에 초대 메시지를 보내는 함수
 * @param {string} invitedUserId - 초대할 사용자의 ID
 * @param {string} groupId - 초대할 그룹의 ID
 * @returns {Promise<string>} - 초대 결과 메시지
 */
export const inviteToGroup = async (invitedUserId: string, groupId: string): Promise<string> => {
  const self = await getSelf();

  try {
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        groupUser: true,
      },
    });

    if (!group) {
      throw new Error("그룹을 찾을 수 없습니다");
    }

    if (!group.groupUser.some((user) => user.id === self.id)) {
      throw new Error("사용자 그룹이 아닙니다");
    }

    if (group.leader === self.id) {
      throw new Error("사용자 그룹이 아닙니다");
    }

    // 이미 초대 중인지 확인
    const existingRequest = await db.groupApplication.findFirst({
      where: {
        groupId: groupId,
        userId: self.id,
      },
    });

    if (existingRequest) {
      throw new Error("이미 이 그룹에 초대되었습니다");
    }

    // 초대 메시지 반환
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

/**
 * 그룹 가입 요청을 수락하고 그룹에 사용자를 추가하는 함수
 * @param {string} userId - 가입 요청을 수락할 사용자의 ID
 * @param {string} groupId - 가입 요청을 수락할 그룹의 ID
 * @returns {Promise<string>} - 가입 요청 수락 결과 메시지
 */
export const acceptGroupRequestAndAddUserToGroup = async (userId: string, groupId: string): Promise<string> => {
  try {
    const request = await db.groupApplication.findFirst({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });

    if (!request) {
      throw new Error("가입 신청을 찾을 수 없습니다");
    }

    const self = await getSelf();

    // 리더가 아닌 사용자가 요청을 수락할 수 없음
    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        groupUser: true,
      },
    });

    if (!group || group.leader === self.id) {
      throw new Error("사용자는 리더가 아닙니다");
    }

    // 가입 신청 승인 (승인을 했으니 대기자 명단에서 삭제)
    await db.groupApplication.delete({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });

    // 그룹에 사용자 추가
    await db.group.update({
      where: { id: groupId },
      data: {
        groupUser: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return "그룹 가입 요청이 성공적으로 수락되었습니다";
  } catch (error) {
    console.error("그룹 가입 요청 수락 및 사용자 추가 중 오류:", error);
    throw new Error("그룹 가입 요청 수락 및 사용자 추가 중 오류 발생");
  }
};

/**
 * 모든 그룹을 조회하는 함수
 * @returns {Promise<Group[]>} - 조회된 모든 그룹 목록
 */
export const viewAllGroups = async ()=> {
  try {
    const allGroups = await db.group.findMany();
    return allGroups;
  } catch (error) {
    console.error("그룹 조회 중 오류:", error);
    throw new Error("그룹 조회 중 오류 발생");
  }
};

/**
 * 현재 사용자가 가입한 모든 그룹을 조회하는 함수
 * @returns {Promise<Group>} - 현재 사용자가 가입한 모든 그룹 정보
 */
export const viewMyGroups = async () => {
  const self = await getSelf();

  try {
    const group = await db.group.findUnique({
      where: { id: self.id },
      include: {
        groupUser: true,
      },
    });

    return group;
  } catch (error) {
    console.error("내 그룹 조회 중 오류:", error);
    throw new Error("내 그룹 조회 중 오류 발생");
  }
};
