import React from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { CommentsBlockType } from './types';

import { CommentType } from 'api/types';
import { SideBlock } from 'components';
import { ReturnComponentType } from 'types';

export const CommentsBlock = ({
    items,
    children,
    isLoading = true,
}: CommentsBlockType): ReturnComponentType => {
    return (
        <SideBlock title="Comments">
            <List>
                {(isLoading ? [...Array(5)] : items).map((comment: CommentType) => (
                    <React.Fragment key={comment?._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40} />
                                ) : (
                                    <Avatar
                                        alt={comment?.user?.fullName}
                                        src="https://mui.com/static/images/avatar/1.jpg"
                                    />
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </div>
                            ) : (
                                <ListItemText
                                    primary={comment?.user?.fullName}
                                    secondary={comment?.text}
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
