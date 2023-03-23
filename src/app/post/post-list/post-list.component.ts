import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'prestonmontewest-entities';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/services/auth.service';
import { PostFilter, PostService } from '../post.service';

@Component({
  selector: 'pmw-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  retrievedPosts = false;
  canCreatePost$ = this.auth.hasPermissions([
    environment.auth0.createPostScope,
  ]);

  constructor(
    private readonly postService: PostService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly meta: Meta,
    private readonly titleService: Title,
    private readonly auth: AuthService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(environment.title);

    this.meta.updateTag({
      name: 'description',
      content: 'A blog by Preston Monte West.',
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const filter: PostFilter = {
        title: params['title'],
        limit: params['limit'],
      };
      this.getPosts(filter);
    });
  }

  handleSearch(searchText: string) {
    const filter = { title: searchText };
    this.getPosts(filter);
  }

  private getPosts(filter: PostFilter) {
    this.postService.getPosts(filter).subscribe({
      next: (posts) => (this.posts = posts),
      error: (err) => {
        console.error(err);
        this.retrievedPosts = true;
      },
      complete: () => (this.retrievedPosts = true),
    });
  }
}
