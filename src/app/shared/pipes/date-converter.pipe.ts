import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'dateConverter',
})
export class DateConverterPipe implements PipeTransform {
  transform(date: string, format: string = 'DD MMM, HH:mm'): string {
    return moment.utc(date).format(format);
  }
}
