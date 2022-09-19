import { ReactNode } from 'react';

export type InputFileTypePropsType = {
    setImageUrl: (value: string) => void;
    children?: ReactNode;
    className: string;
};
