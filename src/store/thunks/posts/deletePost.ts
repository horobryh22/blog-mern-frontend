import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const deletePost = createAsyncThunk<void, string, { rejectValue: string }>(
    'posts/deletePost',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            await postsAPI.deletePost(id);

            await postsAPI.fetchPosts();
        } catch (e) {
            const err = e as AxiosError;

            dispatch(setAppStatus(REQUEST_STATUS.ERROR));

            return rejectWithValue(err.message);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
