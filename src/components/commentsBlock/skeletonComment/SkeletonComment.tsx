import React from 'react';

import Skeleton from '@mui/material/Skeleton';

import { ReturnComponentType } from 'types';

export const SkeletonComment = (): ReturnComponentType => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Skeleton variant="text" height={25} width={120} />
            <Skeleton variant="text" height={18} width={230} />
        </div>
    );
};
