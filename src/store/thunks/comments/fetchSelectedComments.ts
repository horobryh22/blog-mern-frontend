import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { commentsAPI } from 'api';
import { CommentType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const fetchSelectedComments = createAsyncThunk<
    CommentType[],
    string,
    { rejectValue: string }
>('comments/fetchSelectedComments', async (id, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));

        const response = await commentsAPI.fetchSelectedComments(id);

        return response.data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
