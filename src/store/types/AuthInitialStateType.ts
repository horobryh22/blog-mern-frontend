import { REQUEST_STATUS } from 'enums';
import { Nullable } from 'types';

export type AuthInitialStateType = {
    data: Nullable<any>;
    status: REQUEST_STATUS;
    isUserLogged: boolean;
};
