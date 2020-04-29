import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
  { path: '**', redirectTo: 'blog' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
