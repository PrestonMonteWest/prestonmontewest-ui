import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { SearchComponent } from './search/search.component';
import { SocialComponent } from './social/social.component';
import { UrlEncode } from './url-encode.pipe';

@NgModule({
  declarations: [
    SearchComponent,
    SocialComponent,
    UrlEncode,
    FileUploadComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [SearchComponent, SocialComponent, UrlEncode, FileUploadComponent],
})
export class SharedModule {}
