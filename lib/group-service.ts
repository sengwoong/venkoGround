

import { db } from "@/lib/db";

import { Group, User } from "@prisma/client";

enum typeProps {
  leader = "leader",
  student = "student"
}

/**
 * 새로운 그룹을 생성하는 함수
 * @param {string} grouptitle - 생성할 그룹의 제목
 * @returns {Promise<string>} - 그룹 생성 결과 메시지
 */
export const createGroup = async (grouptitle: string,self:User ): Promise<string> => {
 

  
    try {
      console.log("Inside try block");
      
      const newGroup = await db.group.create({
        data: {
          grouptitle,
          leader: self.id,
          groupUser: {
            connect: [{ id: self.id }], 
          },
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
export const requestToJoinGroup = async (groupId: string,self:User): Promise<string> => {


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
        username: self.username
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
export const inviteToGroup = async (invitedUserId: string, groupId: string,self:User): Promise<string> => {


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
 * @param {object} self - 현재 사용자 정보
 * @returns {Promise<string>} - 가입 요청 수락 결과 메시지
 */
export const acceptGroupRequestAndAddUserToGroup = async (userId:string, groupId:string, self:User) => {
  let responseMessage = "";
  let transactionError = null;

  console.log("groupId")
  console.log(groupId)

  console.log("userId")
  console.log(userId)
  try {
    await db.$transaction(async (prisma) => {
      const request = await prisma.groupApplication.findFirst({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });
      console.log("groupApplication 에서 해당 유저를 가져옴")
      console.log(request)

      if (!request) {
        throw new Error("가입 신청을 찾을 수 없습니다");
      }

      // 리더가 아닌 사용자가 요청을 수락할 수 없음
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: {
          groupUser: true,
        },
      });


      console.log("group 과 리더가 맞는지 확인중 그룹장리더가누구인지 보기")
      console.log(group?.leader)
      console.log( self.id)


      if (!group && group!.leader == self.id) {
        throw new Error("사용자는 리더가 아닙니다");
      }

      // 가입 신청 승인 (승인을 했으니 대기자 명단에서 삭제)
      await prisma.groupApplication.delete({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });

      // 그룹에 사용자 추가
      await prisma.group.update({
        where: { id: groupId },
        data: {
          groupUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      responseMessage = "그룹 가입 요청이 성공적으로 수락되었습니다";
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("트랜잭션 중 오류 발생:", transactionError);
      throw new Error("그룹 가입 요청 수락 및 사용자 추가 중 오류 발생");
    } else {
      console.log("트랜잭션 성공:", responseMessage);
      return responseMessage;
    }
  }
};

/** 전체 그룹 찾기
 *컬럼은 아래가 추가됩니다.
 *drawTables
  groupUser
  groupNotifications
  groupApplications
 * @param term 
 * @returns 
 */
export const viewAllGroups = async (term: string | undefined,page: number) => {
  try {
    const whereCondition = term && term.trim() !== "" ? {
      OR: [
        { grouptitle: { contains: term } },
        { groupUser: { some: { username: { contains: term } } } }
      ]
    } : {};

    const totalCount = await db.group.count({ where: whereCondition });
    const totalPages = Math.ceil(totalCount / 2);



    const allGroups = await db.group.findMany({
      include: {
        drawTables: true,
        groupUser: true,
        groupNotifications: true,
        groupApplications: true
      },
      where: whereCondition ,
      skip: (page - 1) * 2,
      take: 2
    });

    return {totalPages,allGroups};
  } catch (error) {
    console.error("그룹 조회 중 오류:", error);
    throw new Error("그룹 조회 중 오류 발생");
  }
};
/** 나의그룹 찾기
 *컬럼은 아래가 추가됩니다.
 *drawTables
  groupUser
  groupNotifications
  groupApplications
 * @param self 
 * @param term 
 * @returns 
 */
export const viewMyGroups = async (self: any, term: string | undefined,page: number) => {
  try {

    
    const whereCondition = term && term.trim() !== "" ? {
      AND: [
        {
          groupUser: {
            some: {
              id: self.id
            }
          }
        },
        {
          OR: [
            { grouptitle: { contains: term } },
            { groupUser: { some: { username: { contains: term } } } }
          ]
        }
      ]
    } : {
      groupUser: {
        some: {
          id: self.id
        }
      }
    };

    const totalCount = await db.group.count({ where: whereCondition });
    const totalPages = Math.ceil(totalCount / 2);

    

    const myGroups = await db.group.findMany({
      include: {
        drawTables: true,
        groupUser: true,
        groupNotifications: true,
        groupApplications: true
      },
      where: whereCondition,
      skip: (page - 1) * 2,
      take: 2
    });

    return {totalPages,myGroups};
  } catch (error) {
    console.error("나의 그룹 조회 중 오류:", error);
    throw new Error("나의 그룹 조회 중 오류 발생");
  }
};




/**
 * 그룹에서 사용자를 강퇴하는 함수
 * @param {string} groupId - 강퇴할 그룹의 ID
 * @param {string} userId - 강퇴할 사용자의 ID
 * @param {User} self - 현재 로그인한 사용자
 * @returns {Promise<string>} - 강퇴 결과 메시지
 */
export const removeUserFromGroup = async (groupId: string, userId: string, self: User): Promise<string> => {
  try {
    // 리더인지 확인
    const group = await db.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error("그룹을 찾을 수 없습니다");
    }

    if (group.leader !== self.id) {
      throw new Error("리더만이 다른 사용자를 그룹에서 강퇴할 수 있습니다");
    }

    // 사용자를 그룹에서 제거
    await db.group.update({
      where: { id: groupId },
      data: {
        groupUser: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return "사용자가 그룹에서 성공적으로 강퇴되었습니다";
  } catch (error) {
    console.error("그룹에서 사용자를 강퇴 중 오류:", error);
    throw new Error("그룹에서 사용자를 강퇴 중 오류 발생");
  }
};

/**
 * 그룹에서 나가는 함수
 * @param {string} userId - 그룹을 나갈 사용자의 ID
 * @param {string} groupId - 그룹을 나갈 그룹의 ID
 * @param {object} self - 현재 사용자 정보
 * @returns {Promise<string>} - 그룹 탈퇴 결과 메시지
 */
export const leaveGroup = async ( groupId:string, self:User) => {
  let responseMessage = "";
  let transactionError = null;

  try {
    await db.$transaction(async (prisma) => {
      // 사용자가 그룹 리더인지 확인
      const group = await prisma.group.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        throw new Error("그룹을 찾을 수 없습니다");
      }

      if (group.leader === self.id) {
        throw new Error("그룹 리더는 그룹을 나갈 수 없습니다");
      }

      // 사용자를 그룹에서 제거
      await prisma.group.update({
        where: { id: groupId },
        data: {
          groupUser: {
            disconnect: {
              id: self.id,
            },
          },
        },
      });

      responseMessage = "그룹에서 성공적으로 나가셨습니다";
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("트랜잭션 중 오류 발생:", transactionError);
      throw new Error("그룹 탈퇴 중 오류 발생");
    } else {
      console.log("트랜잭션 성공:", responseMessage);
      return responseMessage;
    }
  }
};

/**
 * 그룹의 파티장을 변경하는 함수
 * @param {string} newLeaderId - 새로운 파티장이 될 사용자의 ID
 * @param {string} groupId - 파티장을 변경할 그룹의 ID
 * @param {User} self - 현재 로그인한 사용자
 * @returns {Promise<string>} - 파티장 변경 결과 메시지
 */
export const changeGroupLeader = async (newLeaderId: string, groupId: string, self: User): Promise<string> => {
  let responseMessage = "";
  let transactionError = null;

  try {
    await db.$transaction(async (prisma) => {
      // 그룹을 찾고 그룹의 정보를 가져옵니다.
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: {
          groupUser: true,
        },
      });

      if (!group) {
        throw new Error("그룹을 찾을 수 없습니다");
      }

      // 현재 사용자가 그룹의 리더인지 확인합니다.
      if (group.leader !== self.id) {
        throw new Error("리더만이 그룹의 파티장을 변경할 수 있습니다");
      }
      const newLeaderInGroup = await prisma.group.findFirst({
        where: {
          groupUser: {
            some: {
              id: newLeaderId,
            }
          },
          id: groupId,
        },
      });
      
      

      if (!newLeaderInGroup) {
        throw new Error("그룹에 속한 사용자만이 파티장이 될 수 있습니다");
      }

      // 그룹의 리더를 변경합니다.
      await prisma.group.update({
        where: { id: groupId },
        data: {
          leader: newLeaderId,
        },
      });

       

      responseMessage = "파티장이 성공적으로 변경되었습니다";
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("트랜잭션 중 오류 발생:", transactionError);
      throw new Error("그룹 파티장 변경 중 오류 발생");
    } else {
      console.log("트랜잭션 성공:", responseMessage);
      return responseMessage;
    }
  }
};

