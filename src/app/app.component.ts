import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = environment.title;
  year = new Date().getFullYear();
  route: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((value) => {
      if (this.location.path() !== '') {
        this.route = this.location.path();
      } else {
        this.route = '/';
      }
    });
  }
}
