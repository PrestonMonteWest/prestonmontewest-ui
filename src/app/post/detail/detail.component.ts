import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'post-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const title: string = this.route.snapshot.paramMap.get('title');
    this.postService.getPostByTitle(title).subscribe(
      (post: Post) => this.post = post,
      (err: any) => console.error(err),
    );
  }
}
