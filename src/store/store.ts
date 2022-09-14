import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/slices/app';
import postsReducer from 'store/slices/posts';

export const store = configureStore({
    reducer: {
        app: appReducer,
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;