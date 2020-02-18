import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'urlEncode'
})
@Injectable({
  providedIn: 'root'
})
export class UrlEncode implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
