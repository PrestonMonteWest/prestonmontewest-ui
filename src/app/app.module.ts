import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule, Meta, Title } from "@angular/platform-browser";
import { DISQUS_SHORTNAME } from "ngx-disqus";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    Title,
    Meta,
    { provide: DISQUS_SHORTNAME, useValue: environment.disqus.shortname },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
