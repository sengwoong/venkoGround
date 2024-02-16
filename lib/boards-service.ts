// db.js 파일에서 Prisma client를 가져옵니다.
import { db } from "@/lib/db";
import { User } from "@prisma/client";

// 사용자가 속한 모든 그룹의 보드 리스트 가져오기
export async function getBoardsOfUserGroups(userId:string, page:number) {
  const pageSize = 10;
  try {
    // 사용자가 속한 그룹을 찾고, 각 그룹의 보드를 가져옵니다.
    const Group = await db.group.count({
      where: {
        groupUser: {
          some: {
            id: userId
          }
        }
      },
     
    
    });

  
    const userGroupsBoards = await db.group.findMany({
      where: {
        groupUser: {
          some: {
            id: userId
          }
        }
      },
      include: {
        drawTables: true
      },
      skip: (page - 1) * pageSize, // 페이지 번호에 따라 건너뛸 항목 수 계산
      take: pageSize // 페이지 당 항목 수
    });


    


    // 전체 페이지 수 계산
    const totalBoardPages = Math.ceil(Group / pageSize);

    return { userGroupsBoards, totalBoardPages };
  } catch (error) {
    console.error("Error fetching user groups and boards:", error);
    throw error;
  }
}

// 사용자가 리더인 보드 리스트 가져오기
export async function getBoardsLeaderByUser(userId:string, page:number) {
  const pageSize = 10;
  try {

    const Group = await db.group.count({
      where: {
        groupUser: {
          some: {
            id: userId
          }
        }
      },
     
    
    });


    // 사용자가 리더인 그룹 리스트 가져오기
    const userLeaderBoards = await db.group.findMany({
      where: {
        leader: userId
      },
      include: {
        drawTables: true
      },
      skip: (page - 1) * pageSize, // 페이지 번호에 따라 건너뛸 항목 수 계산
      take: pageSize // 페이지 당 항목 수
    });

   


    // 전체 페이지 수 계산
    const totalBoardPages = Math.ceil(Group/ pageSize);

    return { userLeaderBoards, totalBoardPages };
  } catch (error) {
    console.error("Error fetching boards created by user:", error);
    throw error;
  }
}








// 3. 모든 보드 가져오기, 단 서치를 할 시 해당 보드만 보이기
export async function getAllBoardsWithSearch(searchTerm:string) {
  try {
    // 검색어를 포함하는 보드를 가져옵니다.
    const boardsWithSearch = await db.drawTable.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    return boardsWithSearch;
  } catch (error) {
    console.error("Error fetching boards with search:", error);
    throw error;
  }
}





/**
 * 보드를 삭제하는 함수
 * @param {string} boardId - 삭제할 보드의 ID
 * @param {User} self - 현재 로그인한 사용자
 * @returns {Promise<string>} - 보드 삭제 결과 메시지
 */
export const deleteBoard = async (boardId: string, self: User): Promise<string> => {
  let responseMessage = "";
  let transactionError = null;

  try {
    await db.$transaction(async (prisma) => {
      // 보드를 찾습니다.
      const board = await prisma.drawTable.findUnique({
        where: { id: boardId },
        include: {
          group: true,
        },
      });

      if (!board) {
        throw new Error("보드를 찾을 수 없습니다");
      }

      // 보드를 소유한 그룹의 리더인지 확인합니다.
      if (board.group.leader !== self.id) {
        throw new Error("그룹의 리더만이 보드를 삭제할 수 있습니다");
      }

      // 보드를 삭제합니다.
      await prisma.drawTable.delete({
        where: { id: boardId },
      });

      responseMessage = "보드가 성공적으로 삭제되었습니다";
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("보드 삭제 중 오류 발생:", transactionError);
      throw new Error("보드 삭제 중 오류 발생");
    } else {
      console.log("보드 삭제 성공:", responseMessage);
      return responseMessage;
    }
  }
};

/**
 * 그룹장이 보드 생성
 * @param {string} groupId - 보드를 추가할 그룹의 ID
 * @param {string} title - 보드 제목
 * @param {Bytes} img - 이미지
 * @param {User} self - 현재 로그인한 사용자
 * @returns {Promise<string>} - 보드 추가 결과 메시지
 */
export const addBoardToGroup = async (groupId: string, title: string, img: string, self: User): Promise<string> => {
  let responseMessage = "";
  let transactionError = null;

  try {
    await db.$transaction(async (prisma) => {
      // 그룹을 찾고 그룹의 정보를 가져옵니다.
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: {
          drawTables: true,
          groupUser: true,
        },
      });

      if (!group) {
        throw new Error("그룹을 찾을 수 없습니다");
      }

      // 현재 사용자가 그룹의 리더인지 확인합니다.
      if (group.leader !== self.id) {
        throw new Error("리더만이 그룹에 보드를 추가할 수 있습니다");
      }

      // 보드를 그룹에 추가합니다.
      const newDrawTable = await prisma.drawTable.create({
        data: {
          title: title,
          img: img,
          groupId: groupId,
        },
      });

      // 그룹에 새로운 보드를 추가합니다.
      const updatedGroup = await prisma.group.update({
        where: { id: groupId },
        data: {
          drawTables: {
            connect: {
              id: newDrawTable.id,
            },
          },
        },
        include: {
          drawTables: true,
          groupUser: true,
        },
      });

      // 만약 그룹에 보드가 추가되었다면 성공 메시지를 설정합니다.
      if (updatedGroup.drawTables.find(board => board.id === newDrawTable.id)) {
        responseMessage = "보드가 그룹에 성공적으로 추가되었습니다";
      } else {
        throw new Error("보드를 그룹에 추가하는 데 문제가 발생했습니다");
      }
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("트랜잭션 중 오류 발생:", transactionError);
      throw new Error("그룹에 보드 추가 중 오류 발생");
    } else {
      console.log("트랜잭션 성공:", responseMessage);
      return responseMessage;
    }
  }
};


/**
 * 보드를 수정하는 함수
 * @param {string} boardId - 수정할 보드의 ID
 * @param {string} newTitle - 새로운 제목
 * @param {Buffer} newImg - 새 이미지 데이터
 * @param {User} self - 현재 로그인한 사용자
 * @returns {Promise<string>} - 보드 수정 결과 메시지
 */
export const updateBoard = async (boardId: string, newTitle: string|null, newImg: Buffer|null, self: User): Promise<string> => {
  let responseMessage = "";
  let transactionError = null;

  try {
    await db.$transaction(async (prisma) => {

     if(newImg==null && newTitle==null){
      throw new Error("수정할 데이터가 없습니다.");
     }
      // 보드를 찾습니다.
      const board = await prisma.drawTable.findUnique({
        where: { id: boardId },
        include: {
          group: true,
        },
      });

      if (!board) {
        throw new Error("보드를 찾을 수 없습니다");
      }

      // 보드를 소유한 그룹의 리더인지 확인합니다.
      if (board.group.leader !== self.id) {
        throw new Error("그룹의 리더만이 보드를 수정할 수 있습니다");
      }
      const Query: Record<string, any> = {};

      if (newTitle != null) {
        Query.title = newTitle;
      }
      if (newImg != null) {
        Query.img = newImg;
      }
      



      // 보드를 업데이트합니다.
      await prisma.drawTable.update({
        where: { id: boardId },
        data: Query
      });

      responseMessage = "보드가 성공적으로 수정되었습니다";
    });
  } catch (error) {
    transactionError = error;
  } finally {
    if (transactionError) {
      console.error("보드 수정 중 오류 발생:", transactionError);
      throw new Error("보드 수정 중 오류 발생");
    } else {
      console.log("보드 수정 성공:", responseMessage);
      return responseMessage;
    }
  }
};

