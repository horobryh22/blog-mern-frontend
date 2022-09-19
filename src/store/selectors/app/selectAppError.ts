import { RootState } from 'store/store';
import { Nullable } from 'types';

export const selectAppError = (state: RootState): Nullable<string> => {
    return state.app.error;
};
