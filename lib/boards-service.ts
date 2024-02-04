// db.js 파일에서 Prisma client를 가져옵니다.
import { db } from "@/lib/db";

// 1. 사용자가 속한 모든 그룹의 보드 리스트 가져오기
export async function getBoardsOfUserGroups(userId:string) {
  try {
    // 사용자가 속한 그룹을 찾고, 각 그룹의 보드를 가져옵니다.
    const userGroups = await db.group.findMany({
      where: {
        user: userId,
        membershipstatus: true,
      },
      include: {
        drawTables: true,
      },
    });

    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups and boards:", error);
    throw error;
  }
}

// 2. 사용자가 만든 모든 보드 보이기
export async function getBoardsCreatedByUser(userId:string) {
  try {
    // 사용자가 만든 모든 보드를 가져옵니다.
    const userCreatedBoards = await db.drawTable.findMany({
      where: {
        viewUser: {
          some: {
            id: userId,
          },
        },
      },
    });

    return userCreatedBoards;
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

// 4. 모든 보드 가져오기(내가 속한 그룹이거나 내가 만든), 단 서치를 할 시 해당 보드만 보이기
export async function getAllBoardsForUserWithSearch(userId:string, searchTerm:string) {
  try {
    // 사용자가 속한 그룹의 보드와 사용자가 만든 보드를 가져옵니다.
    const allBoardsForUser = await db.drawTable.findMany({
      where: {
        OR: [
          {
            viewUser: {
              some: {
                id: userId,
              },
            },
          },
          {
            viewUser: {
              every: {
                id: userId,
              },
            },
          },
        ],
        AND: [
          {
            OR: [
              {
                title: {
                  contains: searchTerm,
                },
              },
              // 다른 검색 조건을 필요에 따라 추가하세요.
            ],
          },
        ],
      },
    });

    return allBoardsForUser;
  } catch (error) {
    console.error("Error fetching all boards for user with search:", error);
    throw error;
  }
}





// 5. 새 보드 만들기
/**
 * 새 보드를 생성하고 기존 그룹과 연결합니다.
 *
 * @param userId - 보드를 생성하는 사용자의 ID입니다.
 * @param boardTitle - 새 보드의 제목입니다.
 * @param boardImg - 새 보드의 이미지 데이터입니다.
 * @param groupId - 보드를 연결할 기존 그룹의 ID입니다.
 * @returns 생성된 보드입니다.
 * @throws 보드를 생성하는 동안 문제가 발생하면 오류가 throw됩니다.
 */
export async function createBoard(userId: string, boardTitle: string, boardImg: Buffer, groupId: string) {
  try {
    // Create the new board and associate it with the specified group
    const newBoard = await db.drawTable.create({
      data: {
        title: boardTitle,
        img: boardImg,
        viewUser: {
          connect: { id: groupId }, // Connect the board to the specified group
        },
      },
    });

    return newBoard;
  } catch (error) {
    console.error("Error creating a new board:", error);
    throw error;
  }
}
