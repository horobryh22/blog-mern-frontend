import React from 'react';

import { UserInfoType } from './types';
import styles from './UserInfo.module.scss';

import defaultAvatar from 'assets/images/defaultAvatar.jpg';
import { ReturnComponentType } from 'types';

export const UserInfo = ({
    avatarUrl,
    fullName,
    additionalText,
}: UserInfoType): ReturnComponentType => {
    return (
        <div className={styles.root}>
            <img
                className={styles.avatar}
                src={avatarUrl || defaultAvatar}
                alt={fullName}
            />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
};
