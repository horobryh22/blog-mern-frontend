import { REQUEST_STATUS } from 'enums';
import { RootState } from 'store/store';

export const selectAppStatus = (state: RootState): REQUEST_STATUS => {
    return state.app.status;
};
