import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { fetchUserData } from 'store/thunks';
import { AuthInitialStateType } from 'store/types';

const initialState: AuthInitialStateType = {
    data: null,
    isUserLogged: false,
    status: REQUEST_STATUS.SUCCESS,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isUserLogged = true;
            })
            .addCase(fetchUserData.pending, () => {})
            .addCase(fetchUserData.rejected, () => {});
    },
});

export default authSlice.reducer;
