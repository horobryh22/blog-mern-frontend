import { createSlice } from '@reduxjs/toolkit';

import { UserDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { login, me, register } from 'store/thunks';
import { AuthInitialStateType } from 'store/types';

const initialState: AuthInitialStateType = {
    data: {} as UserDataType,
    isUserLogged: false,
    status: REQUEST_STATUS.SUCCESS,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = {} as UserDataType;
            state.status = REQUEST_STATUS.IDLE;
            state.isUserLogged = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isUserLogged = true;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(login.pending, state => {
                state.status = REQUEST_STATUS.LOADING;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            })
            .addCase(login.rejected, state => {
                state.status = REQUEST_STATUS.ERROR;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isUserLogged = true;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(me.pending, state => {
                state.status = REQUEST_STATUS.LOADING;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            })
            .addCase(me.rejected, state => {
                state.status = REQUEST_STATUS.ERROR;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isUserLogged = true;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(register.pending, state => {
                state.status = REQUEST_STATUS.LOADING;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            })
            .addCase(register.rejected, state => {
                state.status = REQUEST_STATUS.ERROR;
                state.isUserLogged = false;
                state.data = {} as UserDataType;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
