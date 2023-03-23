import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { DISQUS_SHORTNAME } from 'ngx-disqus';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.audience,
        scope: environment.auth0.scope,
      },
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [
          // {
          //   uri: '/api/posts',
          //   allowAnonymous: true,
          // },
          {
            uri: '/api/*',
            allowAnonymous: true,
          },
        ],
      },
    }),
  ],
  providers: [
    Title,
    Meta,
    { provide: DISQUS_SHORTNAME, useValue: environment.disqus.shortname },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
