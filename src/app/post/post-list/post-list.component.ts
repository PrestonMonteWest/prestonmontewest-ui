import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';
import { PostDisplay, PostFilter } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'pmw-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: PostDisplay[] = [];
  retrievedPosts: boolean = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Preston Monte West");
    this.meta.updateTag({
      name: 'description',
      content: "A blog by Preston Monte West."
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const filter: PostFilter = {
        title: params['title'],
        limit: params['limit']
      };
      this.getPosts(filter);
    });
  }

  handleSearch(searchText: string): void {
    const filter: PostFilter = { title: searchText };
    this.getPosts(filter);
  }

  private getPosts(filter: PostFilter): void {
    this.postService.getPosts(filter).subscribe(
      (posts: PostDisplay[]) => this.posts = posts,
      (err: any) => {
        console.error(err);
        this.retrievedPosts = true;
      },
      () => this.retrievedPosts = true
    );
  }
}
