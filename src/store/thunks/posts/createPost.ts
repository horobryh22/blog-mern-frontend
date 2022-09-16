import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { PostDataType, PostType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const createPost = createAsyncThunk<
    PostType,
    PostDataType,
    { rejectValue: string }
>('posts/createPost', async (postData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const { data } = await postsAPI.createPost(postData);

        return data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
