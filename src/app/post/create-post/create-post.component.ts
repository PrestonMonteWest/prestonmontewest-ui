import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostCreate, PostDisplay } from '../post';
import { PostService } from '../post.service';
import { UrlEncode } from '../../shared/url-encode.pipe';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  model: PostCreate = {
    title: '',
    summary: '',
    image: null,
    content: ''
  };
  error: string = '';
  constructor(
    private postService: PostService,
    private router: Router,
    private urlEncode: UrlEncode
  ) {}

  ngOnInit(): void {}

  onImageChange(imageControl: HTMLInputElement) {
    this.error = '';
    const image: File = imageControl.files[0];
    if (image.type.split('/')[0] !== 'image') {
      imageControl.value = null;
      const errMessage: string = 'File type must be an image';
      console.error(errMessage);
      this.error = errMessage;
    }

    this.model.image = image;
  }

  createPost(): void {
    this.error = '';
    const formData = new FormData();
    formData.append('title', this.model.title);
    formData.append('summary', this.model.summary);
    formData.append('image', this.model.image);
    formData.append('content', this.model.content);
    this.postService.createPost(formData).subscribe(
      (post: PostDisplay) => {
        const title = this.urlEncode.transform(post.title);
        this.router.navigate([`/post/${title}`])
      },
      (err) => {
        err = err.error;
        console.error(err);
        if ('message' in err) {
          this.error = err.message;
        } else {
          this.error = 'Internal error';
        }
      }
    );
  }
}
