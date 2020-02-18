import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreatePostComponent,
    PostDetailComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule {}
