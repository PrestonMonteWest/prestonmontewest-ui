import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { UrlEncode } from './url-encode.pipe';
import { PostRoutingModule } from './post-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    PostDetailComponent,
    PostListComponent,
    UrlEncode,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  exports: [UrlEncode]
})
export class PostModule {}
