import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';
import { RootState } from 'store/store';

export const fetchPosts = createAsyncThunk<
    { posts: PostType[]; postsTotalCount: number },
    void,
    { rejectValue: string; state: RootState }
>('posts/fetchPosts', async (_, { rejectWithValue, dispatch, getState }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));

        const sort = getState().posts.posts.sortBy;
        const response = await postsAPI.fetchPosts(sort);

        return response.data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
