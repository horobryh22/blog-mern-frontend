import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { postsAPI } from 'api';
import { PostDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const updatePost = createAsyncThunk<
    void,
    { postData: PostDataType; id: string },
    { rejectValue: string }
>('posts/updatePost', async ({ id, postData }, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        await postsAPI.updatePost(postData, id);
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
