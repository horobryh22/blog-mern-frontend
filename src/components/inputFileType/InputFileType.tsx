import React, { ChangeEvent, useRef } from 'react';

import { InputFileTypePropsType } from './types';

import { useAppDispatch } from 'hooks';
import { setAppError } from 'store/slices';
import { uploadImage } from 'store/thunks';
import { ReturnComponentType } from 'types';

export const InputFileType = ({
    setImageUrl,
    children,
    className,
}: InputFileTypePropsType): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        try {
            if (e.target.files) {
                const formData = new FormData();
                const file = e.target.files[0];

                formData.append('image', file);
                const { payload } = await dispatch(uploadImage(formData));

                if (payload) setImageUrl(payload);
            }
        } catch (e) {
            dispatch(setAppError('File was not uploaded'));
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                className={className}
            >
                {children}
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        </>
    );
};
