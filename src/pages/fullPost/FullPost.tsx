import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { CommentsBlock, Index, Post, PostSkeleton } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchOnePost } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const FullPost = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const post = useAppSelector(state => state.posts.posts.currentItem);
    const postStatus = useAppSelector(state => state.posts.posts.status);

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePost(id));
        }
    }, []);

    if (postStatus === REQUEST_STATUS.LOADING || !Object.keys(post).length) {
        return <PostSkeleton itemsCount={1} />;
    }

    return (
        <>
            <Post
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={{
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    fullName: post.user.fullName,
                }}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isFullPost
                isEditable={false}
            >
                <p>{post.text}</p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Вася Пупкин',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий 555555',
                    },
                    {
                        user: {
                            fullName: 'Иван Иванов',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
