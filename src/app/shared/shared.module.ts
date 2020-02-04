import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search/search.component';
import { UrlEncode } from './url-encode.pipe';

@NgModule({
  declarations: [
    SearchComponent,
    UrlEncode
  ],
  imports: [ CommonModule ],
  exports: [
    SearchComponent,
    UrlEncode
  ]
})
export class SharedModule { }
