import { UserDataType } from 'api/types/auth/UserDataType';

export type PostType = {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    commentsCount: number;
    user: UserDataType;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};
