import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { commentsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';
import { fetchSelectedComments } from 'store/thunks';

export const createComment = createAsyncThunk<
    string,
    { postId: string; text: string },
    { rejectValue: string }
>('comments/createComment', async ({ postId, text }, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));

        await commentsAPI.create(text, postId);

        await dispatch(fetchSelectedComments(postId));

        return postId;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
