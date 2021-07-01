import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EditorModule } from "@tinymce/tinymce-angular";
import { DisqusModule } from "ngx-disqus";
import { SharedModule } from "../shared/shared.module";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostRoutingModule } from "./post-routing.module";

@NgModule({
  declarations: [CreatePostComponent, PostDetailComponent, PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorModule,
    DisqusModule,
    PostRoutingModule,
    SharedModule,
  ],
})
export class PostModule {}
