import React from 'react';

import TagIcon from '@mui/icons-material/Tag';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { NavLink } from 'react-router-dom';

import { SideBlock } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { changeSelectedTag } from 'store/slices';
import { ReturnComponentType } from 'types';

export const TagsBlock = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const tags = useAppSelector(state => state.posts.tags.items);
    const tagsStatus = useAppSelector(state => state.posts.tags.status);
    const isTagsLoading = tagsStatus === REQUEST_STATUS.LOADING;

    const handleClick = (tag: string): void => {
        dispatch(changeSelectedTag(tag));
    };

    return (
        <SideBlock title="Tags">
            <List>
                {(isTagsLoading ? [...Array(5)] : tags).map(
                    (tag, i: number) =>
                        tag && (
                            <NavLink
                                to={`/tags/${tag}`}
                                key={i}
                                style={{ textDecoration: 'none', color: 'black' }}
                                onClick={() => handleClick(tag)}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <TagIcon />
                                        </ListItemIcon>
                                        {isTagsLoading ? (
                                            <Skeleton width={100} />
                                        ) : (
                                            <ListItemText primary={tag} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ),
                )}
            </List>
        </SideBlock>
    );
};
