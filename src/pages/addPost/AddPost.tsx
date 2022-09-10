import React from 'react';

import { Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import styles from './AddPost.module.scss';

import { ReturnComponentType } from 'types';

import 'easymde/dist/easymde.min.css';

export const AddPost = (): ReturnComponentType => {
    const imageUrl = '';
    const [value, setValue] = React.useState('');

    const handleChangeFile = (): void => {};

    const onClickRemoveImage = (): void => {};

    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, []);

    const options: any = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <Paper style={{ padding: 30 }}>
            <Button variant="outlined" size="large">
                Upload preview
            </Button>
            <input type="file" onChange={handleChangeFile} hidden />
            {imageUrl && (
                <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Delete
                </Button>
            )}
            {imageUrl && (
                <img
                    className={styles.image}
                    src={`http://localhost:4444${imageUrl}`}
                    alt="Uploaded"
                />
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Header of article"
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Tags"
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={value}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button size="large" variant="contained">
                    Publish
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
