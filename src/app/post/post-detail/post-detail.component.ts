import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const title: string = this.route.snapshot.paramMap.get('title');
    this.postService.getPostByTitle(title).subscribe(
      (post: Post) => {
        this.post = post;
        this.title.setTitle(post.title);
        this.meta.updateTag({
          name: 'description', content: this.post.summary
        })
      },
      (err: any) => console.error(err),
    );
  }
}
