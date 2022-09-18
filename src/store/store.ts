import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/slices/app';
import authReducer from 'store/slices/auth';
import commentsReducer from 'store/slices/comments';
import postsReducer from 'store/slices/posts';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
