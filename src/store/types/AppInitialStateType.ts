import { REQUEST_STATUS } from 'enums';

export type AppInitialStateType = {
    isInitialized: boolean;
    status: REQUEST_STATUS;
};
