import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import styles from '../Post.module.scss';

import { PostSkeletonType } from './types';

import { ReturnComponentType } from 'types';

export const PostSkeleton = ({ itemsCount }: PostSkeletonType): ReturnComponentType => {
    const mappedItems = [...Array(itemsCount)].map((el: any, i) => {
        return (
            <div key={i} className={styles.skeleton}>
                <Stack spacing={1}>
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <div className={styles.skeletonContent}>
                        <div className={styles.skeletonUser}>
                            <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                                style={{ marginRight: 10 }}
                            />
                            <div className={styles.skeletonUserDetails}>
                                <Skeleton variant="text" width={60} height={20} />
                                <Skeleton variant="text" width={100} height={15} />
                            </div>
                        </div>
                        <div className={styles.skeletonInfo}>
                            <Skeleton variant="text" width="80%" height={45} />
                            <div className={styles.skeletonTags}>
                                <Skeleton variant="text" width={40} height={30} />
                                <Skeleton variant="text" width={40} height={30} />
                                <Skeleton variant="text" width={40} height={30} />
                            </div>
                        </div>
                    </div>
                </Stack>
            </div>
        );
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{mappedItems}</>;
};
