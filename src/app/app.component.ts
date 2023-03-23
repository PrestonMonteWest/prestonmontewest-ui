import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'pmw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = environment.title;
  year = new Date().getFullYear();
  isAuthenticated = false;

  constructor(
    public readonly auth: AuthService,
    private readonly titleService: Title,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  logout() {
    this.auth.auth0.logout({
      logoutParams: { returnTo: this.doc.location.origin },
    });
  }
}
