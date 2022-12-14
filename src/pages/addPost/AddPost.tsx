import React, { ChangeEvent, useEffect, useState } from 'react';

import { Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import classes from './AddPost.module.scss';

import { InputFileType, PostSkeleton } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged, selectPost, selectPostStatus } from 'store/selectors';
import { setAppError } from 'store/slices';
import { createPost, fetchOnePost, updatePost } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const AddPost = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const navigate = useNavigate();

    const isEditing = Boolean(id);
    const isUserLogged = useAppSelector(selectIsUserLogged);
    const post = useAppSelector(selectPost);
    const postStatus = useAppSelector(selectPostStatus);

    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = useState('');

    const postData = { text, title, tags: tags?.split(', '), imageUrl };

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePost(id));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            setText(post.text);
            setTitle(post.title);
            setTags(post.tags?.join(', '));
            setImageUrl(post.imageUrl);
        } else {
            setText('');
            setTitle('');
            setTags('');
            setImageUrl('');
        }
    }, [id, post]);

    const onClickRemoveImage = (): void => {
        setImageUrl('');
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.currentTarget.value);
    };

    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTags(e.currentTarget.value);
    };

    const handleTextChange = React.useCallback((value: string) => {
        setText(value);
    }, []);

    const createNewPost = async (): Promise<void> => {
        if (postData.text.length >= 3 && postData.title.length >= 3) {
            const response = await dispatch(createPost(postData));

            if (response.payload) {
                navigate(`/posts/${response.payload}`);
            }

            return;
        }

        dispatch(
            setAppError(
                'Title and text are required fields, please type min 3 symbols in each of them:)',
            ),
        );
    };

    const updateCurrentPost = async (): Promise<void> => {
        if (id) {
            if (postData.text.length >= 3 && postData.title.length >= 3) {
                await dispatch(updatePost({ postData, id }));
                navigate(`/posts/${id}`);

                return;
            }

            dispatch(
                setAppError(
                    'Title and text are required fields, please type min 3 symbols in each of them:)',
                ),
            );
        }
    };

    const options: any = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter the text . . .',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!isUserLogged) return <Navigate to="/" />;

    if (postStatus === REQUEST_STATUS.LOADING) {
        return <PostSkeleton itemsCount={1} />;
    }

    return (
        <Paper style={{ padding: 30 }}>
            <InputFileType setImageUrl={setImageUrl} className={classes.uploadButton}>
                Upload preview
            </InputFileType>
            {imageUrl && (
                <>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickRemoveImage}
                    >
                        Delete
                    </Button>
                    <img
                        className={classes.image}
                        src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                        alt="Uploaded"
                    />
                </>
            )}
            <br />
            <br />
            <TextField
                classes={{ root: classes.title }}
                variant="standard"
                placeholder="Header of article"
                fullWidth
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                classes={{ root: classes.tags }}
                variant="standard"
                placeholder="Tags"
                fullWidth
                value={tags}
                onChange={handleTagsChange}
            />
            <SimpleMDE
                className={classes.editor}
                value={text}
                onChange={handleTextChange}
                options={options}
            />
            <div className={classes.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={isEditing ? updateCurrentPost : createNewPost}
                >
                    {isEditing ? 'Save' : 'Publish'}
                </Button>
                <NavLink to="/">
                    <Button size="large">Cancel</Button>
                </NavLink>
            </div>
        </Paper>
    );
};
