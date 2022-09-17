import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setAppError } from 'store/slices';
import { ReturnComponentType } from 'types';

export const SnackBar = (): ReturnComponentType => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.app.error);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError(null));
    };

    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={handleClose}
                message={error}
                action={action}
            />
        </div>
    );
};
