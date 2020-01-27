import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailComponent } from './detail/detail.component';
import { PostListComponent } from './list/list.component';
import { UrlEncode } from './url-encode.pipe';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [
    PostDetailComponent,
    PostListComponent,
    UrlEncode
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  exports: [UrlEncode]
})
export class PostModule {}
