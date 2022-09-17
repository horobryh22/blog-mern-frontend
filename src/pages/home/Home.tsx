import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CommentsBlock, Post, PostSkeleton, TagsBlock } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectAuthUserId, selectPosts, selectPostStatus } from 'store/selectors';
import { fetchPosts, fetchTags } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Home = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(selectPosts);
    const postStatus = useAppSelector(selectPostStatus);
    const isPostsLoading = postStatus === REQUEST_STATUS.LOADING;
    const authUserId = useAppSelector(selectAuthUserId);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);

    const mappedPosts = posts.length ? (
        posts.map(post => (
            <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''}
                user={{
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    fullName: post.user.fullName,
                }}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={post.user._id === authUserId}
                isFullPost={false}
            />
        ))
    ) : (
        <div>Sorry, not found any posts</div>
    );

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Newest" />
                <Tab label="Popular" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {isPostsLoading ? <PostSkeleton itemsCount={3} /> : mappedPosts}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
