import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { PostDisplay } from 'src/app/post/post';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostDetailComponent implements OnInit {
  post: PostDisplay;
  pageId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      (post: PostDisplay) => {
        this.post = post;
        this.pageId = post.title;
        this.title.setTitle(post.title);
        this.meta.updateTag({
          name: 'description', content: this.post.summary
        });
        this.postService.incrementViewCount(title).subscribe(
          null,
          (err: any) => console.log(err)
        );
      },
      (err: any) => {
        console.error(err);
        this.router.navigate(['not-found']);
      }
    );
  }
}
