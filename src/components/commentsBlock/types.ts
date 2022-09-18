import { ReactNode } from 'react';

import { CommentType } from 'api/types';

export type CommentsBlockType = {
    items: CommentType[];
    children?: ReactNode;
    isLoading: boolean;
};
