import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
