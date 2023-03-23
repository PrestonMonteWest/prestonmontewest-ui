import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'pmw-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private lastSearchText = '';
  searchText: string = '';
  private timerSubscription: Subscription | null = null;
  @Input() placeholder: string = '';
  @Input() delay: number = 300;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitSearch(): void {
    this.search.emit(this.searchText);
  }

  onKeyup(): void {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(this.delay).subscribe(() => {
      if (this.searchText !== this.lastSearchText) {
        this.search.emit(this.searchText);
        this.lastSearchText = this.searchText;
      }
    });
  }
}
