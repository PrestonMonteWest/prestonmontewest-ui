import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  {
    path: 'blog',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  { path: 'not-found', pathMatch: 'full', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
