import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'dateConverter',
})
export class DateConverterPipe implements PipeTransform {
  transform(
    date: string | number | object,
    format: string = 'DD MMM, HH:mm'
  ): string {
    return typeof date === 'string' || typeof date === 'object'
      ? moment.utc(date).local().format(format)
      : new Date(date * 1000).toLocaleDateString('ru-RU');
  }
}
