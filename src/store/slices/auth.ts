import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { login, me } from 'store/thunks';
import { AuthInitialStateType } from 'store/types';

const initialState: AuthInitialStateType = {
    data: null,
    isUserLogged: false,
    status: REQUEST_STATUS.SUCCESS,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null;
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
                state.data = null;
            })
            .addCase(login.rejected, state => {
                state.status = REQUEST_STATUS.ERROR;
                state.isUserLogged = false;
                state.data = null;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isUserLogged = true;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(me.pending, state => {
                state.status = REQUEST_STATUS.LOADING;
                state.isUserLogged = false;
                state.data = null;
            })
            .addCase(me.rejected, state => {
                state.status = REQUEST_STATUS.ERROR;
                state.isUserLogged = false;
                state.data = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
