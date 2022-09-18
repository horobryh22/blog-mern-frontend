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
    }, [id]);

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
            <CommentsBlock items={[]} isLoading={false}>
                <Index />
            </CommentsBlock>
        </>
    );
};
