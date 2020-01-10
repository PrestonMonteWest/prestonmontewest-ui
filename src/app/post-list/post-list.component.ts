import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PostService } from "../post.service";
import { Post } from "../post";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  retrievedPosts: boolean = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.postService.getPosts(params["limit"]).subscribe(
        (posts: Post[]) => (this.posts = posts),
        error => console.error(error),
        () => (this.retrievedPosts = true)
      );
    });
  }
}
