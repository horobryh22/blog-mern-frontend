import React from 'react';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './Post.module.scss';
import { PostPropsType } from './types';

import { UserInfo } from 'components';
import { useAppDispatch } from 'hooks';
import { changeSelectedTag } from 'store/slices';
import { deletePost } from 'store/thunks';
import { ReturnComponentType } from 'types';
import { formatDate } from 'utils';

export const Post = ({
    _id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    tags,
    children,
    isFullPost,
    isEditable,
}: PostPropsType): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const onClickRemove = (): void => {
        dispatch(deletePost(_id));
    };

    const handleClick = (tag: string): void => {
        dispatch(changeSelectedTag(tag));
    };

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <NavLink to={`/posts/${_id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </NavLink>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo {...user} additionalText={formatDate(createdAt)} />
                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
                    >
                        {isFullPost ? (
                            title
                        ) : (
                            <NavLink to={`/posts/${_id}`}>{title}</NavLink>
                        )}
                    </h2>
                    <ul className={styles.tags}>
                        {tags[0] &&
                            tags.map((name: string) => (
                                <li key={name}>
                                    <NavLink
                                        to={`/tags/${name}`}
                                        onClick={() => handleClick(name)}
                                    >
                                        #{name}
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                    {children && <div className={styles.content}>{children}</div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon />
                            <span>{commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
