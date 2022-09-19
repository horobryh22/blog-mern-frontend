import React from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from 'react-router-dom';

import { CommentsBlockType } from './types';

import { CommentType } from 'api/types';
import defaultAvatar from 'assets/images/defaultAvatar.jpg';
import { EditableField, SideBlock } from 'components';
import { ReturnComponentType } from 'types';

export const CommentsBlock = ({
    items,
    children,
    isLoading = true,
}: CommentsBlockType): ReturnComponentType => {
    const { id } = useParams();

    return (
        <SideBlock title="Comments">
            <List>
                {(isLoading ? [...Array(3)] : items).map(
                    (comment: CommentType, index) => (
                        <React.Fragment key={comment?._id ? comment?._id : index}>
                            <ListItem
                                alignItems="flex-start"
                                style={id ? { minHeight: 80 } : {}}
                            >
                                <ListItemAvatar>
                                    {isLoading ? (
                                        <Skeleton
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <Avatar
                                            alt={comment?.user?.fullName}
                                            src={
                                                comment?.user?.avatarUrl || defaultAvatar
                                            }
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
                                        <Skeleton
                                            variant="text"
                                            height={25}
                                            width={120}
                                        />
                                        <Skeleton
                                            variant="text"
                                            height={18}
                                            width={230}
                                        />
                                    </div>
                                ) : (
                                    <EditableField
                                        text={comment?.text}
                                        commentId={comment?._id}
                                        fullName={comment?.user?.fullName}
                                        userId={comment?.user?._id}
                                        createdAt={comment?.createdAt}
                                    />
                                )}
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ),
                )}
            </List>
            {children}
        </SideBlock>
    );
};
