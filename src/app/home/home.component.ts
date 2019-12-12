import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts(9).subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}
