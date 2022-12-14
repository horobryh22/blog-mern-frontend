import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import classes from './Home.module.scss';

import { CommentsBlock, Post, PostSkeleton, TagsBlock } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    selectAuthUserId,
    selectCommentsStatus,
    selectLastComments,
    selectPosts,
    selectPostStatus,
    selectSelectedTag,
} from 'store/selectors';
import { changeSortBy } from 'store/slices';
import { fetchComments, fetchPosts, fetchTags } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Home = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const [sortBy, setSortBy] = useState(0);

    const posts = useAppSelector(selectPosts);
    const postStatus = useAppSelector(selectPostStatus);
    const selectedTag = useAppSelector(selectSelectedTag);
    const comments = useAppSelector(selectLastComments);
    const commentsStatus = useAppSelector(selectCommentsStatus);
    const isCommentsLoading = commentsStatus === REQUEST_STATUS.LOADING;
    const isPostsLoading = postStatus === REQUEST_STATUS.LOADING;
    const authUserId = useAppSelector(selectAuthUserId);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
        dispatch(fetchComments());
    }, [sortBy, selectedTag]);

    const changeSort = (): void => {
        if (sortBy) {
            setSortBy(0);
            dispatch(changeSortBy('createdAt'));

            return;
        }

        setSortBy(1);
        dispatch(changeSortBy('viewsCount'));
    };

    const mappedPosts = posts.length ? (
        posts.map(post => (
            <Post
                key={post?._id}
                _id={post?._id}
                title={post?.title}
                imageUrl={
                    post?.imageUrl
                        ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
                        : ''
                }
                user={post?.user}
                createdAt={post?.createdAt}
                viewsCount={post?.viewsCount}
                commentsCount={post?.commentsCount}
                tags={post?.tags}
                isEditable={post?.user?._id === authUserId}
                isFullPost={false}
            />
        ))
    ) : (
        <div>Sorry, not found any posts</div>
    );

    return (
        <>
            <Tabs
                style={{ marginBottom: 15 }}
                value={sortBy}
                aria-label="basic tabs example"
            >
                <Tab label="Newest" onClick={changeSort} />
                <Tab label="Popular" onClick={changeSort} />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {selectedTag && (
                        <div className={classes.tag}>{`# ${selectedTag}`}</div>
                    )}
                    {isPostsLoading ? <PostSkeleton itemsCount={3} /> : mappedPosts}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock />
                    <CommentsBlock items={comments} isLoading={isCommentsLoading} />
                </Grid>
            </Grid>
        </>
    );
};
