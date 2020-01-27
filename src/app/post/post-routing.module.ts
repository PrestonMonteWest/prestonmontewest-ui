import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostDetailComponent } from './detail/detail.component';
import { PostListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: ':title', component: PostDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
