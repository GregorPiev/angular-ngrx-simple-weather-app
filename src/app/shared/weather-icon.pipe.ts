import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

import DOMPurify from 'dompurify';

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    let res = '';
    if (value.includes('sun')) {
      res = 'far fa-sun';
    } else if (value.includes('clear')) {
      res = 'far fa-sun';
    } else if (value.includes('cloud')) {
      res = 'fas fa-cloud-sun';
    } else if (value.includes('rain')) {
      res = 'fas fa-cloud-rain';
    } else if (value.includes('snow')) {
      res = 'far fa-snowflake';
    } else {
      res = 'fas fa-cloud-sun';
    }
    return this._sanitizer.sanitize(
      SecurityContext.HTML,
      this._sanitizer.bypassSecurityTrustHtml(res)
    );
  }
}
