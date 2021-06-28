import { Component, ElementRef, forwardRef, HostListener, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pmw-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  file: File;
  onChange: Function;

  constructor(private host: ElementRef<HTMLInputElement>) {}

  @HostListener('change', ['$event.target.files'])
  emitFile(event: FileList) {
    const file = event?.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue() {
    this.host.nativeElement.value = '';
    delete this.file;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched() {}
}
