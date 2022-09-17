import { REQUEST_STATUS } from 'enums';
import { Nullable } from 'types';

export type AppInitialStateType = {
    isInitialized: boolean;
    status: REQUEST_STATUS;
    error: Nullable<string>;
};
