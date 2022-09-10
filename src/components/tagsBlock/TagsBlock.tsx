import React from 'react';

import TagIcon from '@mui/icons-material/Tag';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { TagsBlockType } from './types';

import { SideBlock } from 'components';
import { ReturnComponentType } from 'types';

export const TagsBlock = ({
    items,
    isLoading = true,
}: TagsBlockType): ReturnComponentType => {
    return (
        <SideBlock title="Tags">
            <List>
                {/* eslint-disable-next-line no-magic-numbers */}
                {(isLoading ? [...Array(5)] : items).map((name: any, i: any) => (
                    <a
                        key={i}
                        style={{ textDecoration: 'none', color: 'black' }}
                        href={`/tags/${name}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <ListItemText primary={name} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </SideBlock>
    );
};
