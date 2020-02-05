import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { Post, PostFilter } from 'src/app/post/post';
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
    private title: Title,
    private meta: Meta,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const filter: PostFilter = {
        title: params['title'],
        limit: params['limit']
      };
      this.postService.getPosts(filter).subscribe(
        (posts: Post[]) => this.posts = posts,
        (err: any) => console.error(err),
        () => this.retrievedPosts = true,
      );
    });

    this.title.setTitle("Preston's Blog");
    this.meta.updateTag({
      name: 'description',
      content: "A list of Preston's most recent posts."
    });
  }

  handleSearch(searchText: string) {
    const filter: PostFilter = { title: searchText };
    this.postService.getPosts(filter).subscribe(
      (posts: Post[]) => this.posts = posts,
      (err: any) => console.error(err)
    );
  }
}
