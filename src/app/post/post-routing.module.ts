import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

import { AdminGuard } from 'src/app/admin.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AdminGuard] },
  { path: ':title', component: PostDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
