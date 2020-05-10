import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { DISQUS_SHORTNAME } from 'ngx-disqus';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    Title,
    Meta,
    { provide: DISQUS_SHORTNAME, useValue: environment.disqus.shortname }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
