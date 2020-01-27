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

  ngOnInit() {
    this.title.setTitle(environment.title);
    this.meta.updateTag({
      name: 'description',
      content: "Preston's personal site for all things related to him."
    })
  }
}
