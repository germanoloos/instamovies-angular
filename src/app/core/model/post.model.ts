import { Comment } from './comment.model';
import { Like } from './like.model';

export interface Post {
    id: string;
    user: string;
    title: string;
    picture: string;
    comments: Comment[];
    likes: Like[];
}
