import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../post';
import { PostService } from '../post.service';
import { UrlEncode } from 'src/app/shared/url-encode.pipe';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  // TODO: make sure image exists
  model: Post = new Post('', '', '', '');
  errors: string[] = [];
  constructor(
    private postService: PostService,
    private router: Router,
    private urlEncode: UrlEncode
  ) {}

  ngOnInit(): void {}

  createPost(): void {
    this.errors = [];
    this.postService.createPost(this.model).subscribe(
      (post: Post) => {
        const title = this.urlEncode.transform(post.title);
        this.router.navigate([`/post/${title}`])
      },
      (err) => {
        console.error(err);
        if ('message' in err) {
          this.errors.push(err.message as string);
        } else {
          this.errors.push('Internal error');
        }
      }
    );
  }
}
