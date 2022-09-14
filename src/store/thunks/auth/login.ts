import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { FormValuesType, UserDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/slices';

export const login = createAsyncThunk<
    UserDataType,
    FormValuesType,
    { rejectValue: string }
>('auth/fetchUserData', async ({ password, email }, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await authAPI.fetchUserData({ email, password });

        return response.data;
    } catch (e) {
        const err = e as AxiosError;

        dispatch(setAppStatus(REQUEST_STATUS.ERROR));

        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
