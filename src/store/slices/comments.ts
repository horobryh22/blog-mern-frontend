import { createSlice } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { fetchComments } from 'store/thunks';
import { CommentsInitialStateType } from 'store/types';

const initialState: CommentsInitialStateType = {
    status: REQUEST_STATUS.IDLE,
    items: [],
    selectedItems: [],
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // get last comments
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = REQUEST_STATUS.SUCCESS;
        });
        builder.addCase(fetchComments.pending, state => {
            state.items = [];
            state.selectedItems = [];
            state.status = REQUEST_STATUS.LOADING;
        });
        builder.addCase(fetchComments.rejected, state => {
            state.items = [];
            state.selectedItems = [];
            state.status = REQUEST_STATUS.ERROR;
        });
    },
});

export default commentsSlice.reducer;
