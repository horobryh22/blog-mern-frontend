export type PostType = {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    user: {
        _id: string;
        fullName: string;
        email: string;
        passwordHash: string;
        createdAt: string;
        updatedAt: string;
    };
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};
