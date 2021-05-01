import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/model/post.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts!: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.postsService.getPosts().subscribe({
      next: posts => this.posts = posts
      , error: (msg) => {
        console.log('Error: ', msg);
      }
    });
  }

}
