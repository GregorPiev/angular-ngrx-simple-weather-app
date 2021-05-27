import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter',
})
export class TempConverterPipe implements PipeTransform {
  transform(value: number, unit: string) {
    if (value && !isNaN(value)) {
      if (unit === 'metric') {
        var temperature = value - 273;
        return temperature.toFixed(2) + ' ' + '\u2103';
      } else if (unit === 'standard') {
        var temperature = ((value - 273) * 9) / 5 + 32;
        return temperature.toFixed(2) + ' ' + '\u2109';
      } else {
        return value.toFixed(2) + ' ' + '\u02DA' + 'K';
      }
    }
    return;
  }
}
