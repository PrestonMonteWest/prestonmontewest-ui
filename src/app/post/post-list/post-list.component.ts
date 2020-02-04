import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { Post } from 'src/app/post/post';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  retrievedPosts: boolean = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.postService.getPosts(params['limit']).subscribe(
        (posts: Post[]) => (this.posts = posts),
        (err: any) => console.error(err),
        () => this.retrievedPosts = true,
      );
    });

    this.title.setTitle("Preston's Blog");
    this.meta.updateTag({
      name: 'description', content: "A list of Preston's most recent posts."
    });
  }
}
