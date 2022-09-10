import React from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { CommentsBlockType } from './types';

import { SideBlock } from 'components';
import { ReturnComponentType } from 'types';

export const CommentsBlock = ({
    items,
    children,
    isLoading = true,
}: CommentsBlockType): ReturnComponentType => {
    return (
        <SideBlock title="Комментарии">
            <List>
                {/* eslint-disable-next-line no-magic-numbers */}
                {(isLoading ? [...Array(5)] : items).map((obj: any, index: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40} />
                                ) : (
                                    <Avatar
                                        alt={obj.user.fullName}
                                        src={obj.user.avatarUrl}
                                    />
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </div>
                            ) : (
                                <ListItemText
                                    primary={obj.user.fullName}
                                    secondary={obj.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};
