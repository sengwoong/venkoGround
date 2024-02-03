// db.js 파일에서 Prisma client를 가져옵니다.
import { db } from "@/lib/db";

// 1. 사용자가 속한 모든 그룹의 보드 리스트 가져오기
async function getBoardsOfUserGroups(userId:string) {
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
async function getBoardsCreatedByUser(userId:string) {
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
async function getAllBoardsWithSearch(searchTerm:string) {
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
async function getAllBoardsForUserWithSearch(userId:string, searchTerm:string) {
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