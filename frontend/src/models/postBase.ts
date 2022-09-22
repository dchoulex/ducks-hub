export interface postBase {
    postId: string;
    title: string;
    timestamp: Date;
    like: number;
    autherId: string;
    authorName: string;
    tags: string[];
}