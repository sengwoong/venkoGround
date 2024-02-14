export type User = {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
    bio: string | null;
    isteacher: boolean;
    createdAt: Date;
    updatedAt: Date;
};
