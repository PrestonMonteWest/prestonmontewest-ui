import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle(environment.title);
    this.meta.updateTag({
      name: 'description',
      content: "Preston's personal site for all things related to him."
    })
  }

  clickPractitionerBadge(): void {
    window.location.href = 'https://www.certmetrics.com/amazon/public/badge.aspx?i=9&t=c&d=2018-10-15&ci=AWS00602410';
  }

  clickDeveloperBadge(): void {
    window.location.href = 'https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2018-09-04&ci=AWS00602410';
  }

  clickArchitectBadge(): void {
    window.location.href = 'https://www.certmetrics.com/amazon/public/badge.aspx?i=1&t=c&d=2019-01-25&ci=AWS00602410';
  }
}
