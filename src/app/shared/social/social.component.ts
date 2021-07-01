import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "pmw-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.scss"],
})
export class SocialComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    (window as any).twttr?.widgets.load();
  }
}
