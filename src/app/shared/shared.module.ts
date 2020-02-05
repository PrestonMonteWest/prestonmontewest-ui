import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { UrlEncode } from './url-encode.pipe';

@NgModule({
  declarations: [
    SearchComponent,
    UrlEncode
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    UrlEncode
  ]
})
export class SharedModule {}
