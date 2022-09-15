import { UserDataType } from 'api/types';
import { REQUEST_STATUS } from 'enums';

export type AuthInitialStateType = {
    data: UserDataType;
    status: REQUEST_STATUS;
    isUserLogged: boolean;
};
