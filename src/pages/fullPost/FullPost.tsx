import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { PostType } from 'api/types';
import { CommentsBlock, Index, Post } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectPosts } from 'store/selectors';
import { fetchPosts } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const FullPost = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const posts = useAppSelector(selectPosts);
    const selectedPost = posts.find(post => post._id === id) || ({} as PostType);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (!Object.keys(selectedPost).length) {
        return <div>LOADING . . .</div>;
    }

    return (
        <>
            <Post
                _id={selectedPost._id}
                title={selectedPost.title}
                imageUrl={selectedPost.imageUrl}
                user={{
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    fullName: selectedPost.user.fullName,
                }}
                createdAt={selectedPost.createdAt}
                viewsCount={selectedPost.viewsCount}
                commentsCount={3}
                tags={selectedPost.tags}
                isFullPost
                isEditable={false}
            >
                <p>{selectedPost.text}</p>
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
