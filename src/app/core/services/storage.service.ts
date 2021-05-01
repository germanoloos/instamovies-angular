import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class StorageService {

    USER_KEY = 'user';
    POSTS_KEY = 'post';

    constructor() {
    }

    setItem(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getItem(key: string): any {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item ?? '') : undefined;
    }

    setUser(data: User): void {
        this.setItem(this.USER_KEY, data);
    }

    getUser(): User | undefined {
        const user = this.getItem(this.USER_KEY);
        return user !== '' ? user as User : undefined;
    }

    removeUser(): void {
        localStorage.removeItem(this.USER_KEY);
    }

    setPosts(data: Post []): void {
        this.setItem(this.POSTS_KEY, data);
    }

    getPosts(): Post[] | undefined {
        const posts = this.getItem(this.POSTS_KEY);
        return posts !== '' ? posts as Post [] : undefined;
    }
}
