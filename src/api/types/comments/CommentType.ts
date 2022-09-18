import { UserDataType } from 'api/types';

export type CommentType = {
    _id: string;
    text: string;
    user: UserDataType;
    post: string;
    createdAt: string;
    updatedAt: string;
};
