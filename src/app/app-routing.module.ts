import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { InterceptorService } from "./shared/services/auth/interceptor.service";

const routes: Routes = [
  { path: "", redirectTo: "blog", pathMatch: "full" },
  {
    path: "blog",
    loadChildren: () => import("./post/post.module").then((m) => m.PostModule),
  },
  { path: "not-found", pathMatch: "full", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
