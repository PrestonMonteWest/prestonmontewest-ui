import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../post';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts(9).subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}
