export type Board = {
    id: string;
    title: string;
    img: string;
    groupId: string;
}

export type UserLeaderGroup = {
    drawTables: Board[];
    id: string;
    grouptitle: string;
    leader: string;
}

type UserLeaderGroupsResponse = {
    userLeaderGroups: UserLeaderGroup[];
    userLeaderBoards?: any; // Add the missing property here
    totalPages: number;
}
