import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private lastSearchText = '';
  searchText: string = '';
  @Input() placeholder: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onKey(): void {
    if (this.searchText !== this.lastSearchText) {
      this.search.emit(this.searchText);
      this.lastSearchText = this.searchText;
    }
  }
}
