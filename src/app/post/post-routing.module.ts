import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { environment } from '../../environments/environment';
import { permissionsGuard } from '../shared/guards/permissions.guard';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  {
    path: 'create',
    component: CreatePostComponent,
    data: { permissions: [environment.auth0.createPostScope] },
    canActivate: [AuthGuard, permissionsGuard()],
  },
  { path: ':title', component: PostDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
