import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { UrlEncode } from './url-encode.pipe';

@NgModule({
  declarations: [
    CreatePostComponent,
    PostDetailComponent,
    PostListComponent,
    UrlEncode
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  exports: [ UrlEncode ]
})
export class PostModule {}
