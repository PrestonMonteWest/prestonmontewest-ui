import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'prestonmontewest-entities';

import { PostService } from '../post.service';

@Component({
  selector: 'pmw-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  pageId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const title = this.route.snapshot.paramMap.get('title');
    if (!title) {
      return;
    }
    this.postService.getPostByTitle(title).subscribe({
      next: (post) => {
        this.post = post;
        this.pageId = post.title;
        this.title.setTitle(post.title);
        this.meta.updateTag({
          name: 'description',
          content: this.post.summary,
        });
      },
      error: (err: Error) => {
        console.error(err);
        this.router.navigate(['not-found']);
      },
    });
  }
}
