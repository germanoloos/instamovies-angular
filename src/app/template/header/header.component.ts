import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/model/post.model';
import { User } from 'src/app/core/model/user.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;
  posts!: Post[];
  comments!: number;
  likes!: number;

  constructor(private postsService: PostsService) {
    // tslint:disable-next-line: deprecation
    this.postsService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        this.likes = 0;
        this.comments = 0;
        this.posts.forEach(post => {
          this.likes += post.likes.length;
          this.comments += post.comments.length;
        });
      }
    });
  }

  ngOnInit(): void {
    this.user = { name: 'Superman', avatar: 'superman.png' } as User;
  }

}
