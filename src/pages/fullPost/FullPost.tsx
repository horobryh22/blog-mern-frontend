import React, { useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { CommentsBlock, Index, Post, PostSkeleton } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectPost, selectPostStatus } from 'store/selectors';
import { fetchOnePost } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const FullPost = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const post = useAppSelector(selectPost);
    const postStatus = useAppSelector(selectPostStatus);

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
                imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isFullPost
                isEditable={false}
            >
                <ReactMarkdown>{post.text}</ReactMarkdown>
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
