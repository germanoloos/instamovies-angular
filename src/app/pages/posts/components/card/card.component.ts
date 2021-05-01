import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/model/post.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
