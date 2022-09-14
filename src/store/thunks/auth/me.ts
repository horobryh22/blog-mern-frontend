import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { UserDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const me = createAsyncThunk<
    Omit<UserDataType, 'token'>,
    void,
    { rejectValue: string }
>('auth/me', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await authAPI.me();

        return response.data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
