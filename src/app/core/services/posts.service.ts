import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment.model';
import { Like } from '../model/like.model';
import { Post } from '../model/post.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject!: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
  }

  getPostsApi(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/posts`);
  }

  getCommentsApi(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/comments`);
  }

  getLikesApi(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/likes`);
  }

  getPosts(): Observable<any> {
    const posts = this.storageService.getPosts();
    if (posts) {
      this.postsSubject.next(posts);
    } else {
      Promise.all([
        this.getPostsApi().toPromise(),
        this.getCommentsApi().toPromise(),
        this.getLikesApi().toPromise(),
      ]).then((result) => {
        const postsApi = result[0] as Post[];
        const commentsApi = result[1] as Comment[];
        const likesApi = result[2] as Like[];

        postsApi.forEach((postItem: Post) => {
          postItem.comments = commentsApi.filter((comment) => comment.postId === postItem.id);
          postItem.likes = likesApi.filter((like) => like.postId === postItem.id);
        });

        // Persistence to save data after reload page
        if (environment.localStoragePersistence) {
          this.storageService.setPosts(postsApi);
        }

        this.postsSubject.next(postsApi);
      }).catch((error) => {
        console.error(error);
      });
    }
    return this.postsSubject.asObservable();
  }

}
