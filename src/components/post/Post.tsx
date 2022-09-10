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

import { PostSkeleton, UserInfo } from 'components';
import { ReturnComponentType } from 'types';

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
    isLoading,
    isEditable,
}: PostPropsType): ReturnComponentType => {
    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = (): void => {};

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
                <UserInfo {...user} additionalText={createdAt} />
                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
                    >
                        {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags.map((name: any) => (
                            <li key={name}>
                                <NavLink to={`/tag/${name}`}>#{name}</NavLink>
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
