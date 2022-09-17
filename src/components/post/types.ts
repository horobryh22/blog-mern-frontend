import { ReactNode } from 'react';

import { UserDataType } from 'api/types';

export type PostPropsType = {
    _id: string;
    title: string;
    createdAt: string;
    imageUrl: string;
    user: UserDataType;
    viewsCount: number;
    commentsCount: number;
    tags: string[];
    children?: ReactNode;
    isFullPost: boolean;
    isEditable: boolean;
};
