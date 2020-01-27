import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'urlEncode' })
export class UrlEncode implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
