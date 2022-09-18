import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { commentsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const removeComment = createAsyncThunk<string, string, { rejectValue: string }>(
    'comments/removeComment',
    async (commentId, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));

            await commentsAPI.remove(commentId);

            return commentId;
        } catch (e) {
            const err = e as AxiosError;

            dispatch(setAppStatus(REQUEST_STATUS.ERROR));

            return rejectWithValue(err.message);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
