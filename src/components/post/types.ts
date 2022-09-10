import { ReactNode } from 'react';

export type PostType = {
    _id: any;
    title: any;
    createdAt: any;
    imageUrl: any;
    user: any;
    viewsCount: any;
    commentsCount: any;
    tags: any;
    children?: ReactNode;
    isFullPost: boolean;
    isLoading: boolean;
    isEditable: boolean;
};
