type GroupUser = {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
    bio: string | null;
    isteacher: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type DrawTable = {
    id: string;
    title: string;
    img: string; 
    groupId: string;
};

type GroupNotification = {
    id: string;
    groupId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
};

export type GroupApplication = {
    id: string;
    status: boolean;
    groupId: string;
    username:string;
    userId: string;
};

type MyGroup = {
    id: string;
    grouptitle: string; // 변경된 이름에 따라 필드 이름도 수정합니다.
    leader: string;
    drawTables: DrawTable[];
    groupUser: GroupUser[];
    groupNotifications: GroupNotification[];
    groupApplications: GroupApplication[];
};

export  type ViewAllGroupResult = MyGroup;


