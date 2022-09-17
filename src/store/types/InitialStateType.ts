import { PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';

type EntityType<T> = T extends PostType
    ? {
          items: T[];
          status: REQUEST_STATUS;
          currentItem: T;
          totalCount: number;
      }
    : { items: T[]; status: REQUEST_STATUS };

export type PostsInitialStateType = {
    posts: EntityType<PostType>;
    comments: EntityType<string>;
    tags: EntityType<string>;
};
