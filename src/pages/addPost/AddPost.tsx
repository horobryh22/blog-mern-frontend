import React, { ChangeEvent, useRef, useState } from 'react';

import { Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import styles from './AddPost.module.scss';

import 'easymde/dist/easymde.min.css';
import { instance } from 'api/config';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsUserLogged } from 'store/selectors';
import { createPost } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const AddPost = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isUserLogged = useAppSelector(selectIsUserLogged);
    const createdPostId = useAppSelector(state => state.posts.posts.currentItem._id);

    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        try {
            if (e.target.files) {
                const formData = new FormData();
                const file = e.target.files[0];

                formData.append('image', file);
                const { data } = await instance.post('/upload', formData);

                setImageUrl(data.url);
            }
        } catch (e) {
            console.warn(e);
            alert('File was not uploaded');
        }
    };

    const onClickRemoveImage = (): void => {
        setImageUrl('');
    };

    const onChange = React.useCallback((value: string) => {
        setText(value);
    }, []);

    const handleTitleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        setTitle(e.currentTarget.value);
    };

    const handleTagsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        setTags(e.currentTarget.value);
    };

    const createNewPost = async (): Promise<void> => {
        await dispatch(createPost({ text, title, tags: tags.split(', '), imageUrl }));

        if (createdPostId) {
            navigate(`/posts/${createdPostId}`);
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

    return (
        <Paper style={{ padding: 30 }}>
            <Button
                onClick={() => inputFileRef.current?.click()}
                variant="outlined"
                size="large"
            >
                Upload preview
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
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
                        className={styles.image}
                        src={`http://localhost:4444${imageUrl}`}
                        alt="Uploaded"
                    />
                </>
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Header of article"
                fullWidth
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Tags"
                fullWidth
                value={tags}
                onChange={handleTagsChange}
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button size="large" variant="contained" onClick={createNewPost}>
                    Publish
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
