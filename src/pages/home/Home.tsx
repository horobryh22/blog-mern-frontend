import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CommentsBlock, Post, TagsBlock } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPosts } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const Home = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.posts.posts.items);
    const status = useAppSelector(state => state.posts.posts.status);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [status]);

    const mappedPosts = posts.map(post => (
        <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
            user={{
                avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: post.user.fullName,
            }}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            commentsCount={3}
            tags={post.tags}
            isEditable
            isLoading={false}
            isFullPost={false}
        />
    ));

    if (status === REQUEST_STATUS.LOADING) return <div>LOADING...</div>;

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Newest" />
                <Tab label="Popular" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {mappedPosts}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock
                        items={['react', 'typescript', 'заметки']}
                        isLoading={false}
                    />
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
