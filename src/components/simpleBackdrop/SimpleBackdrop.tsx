import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

import { SimpleBackdropType } from './types';

import { ReturnComponentType } from 'types';

export const SimpleBackdrop = ({ open }: SimpleBackdropType): ReturnComponentType => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};
