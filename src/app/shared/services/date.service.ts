import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(dir: number) {
    const value = this.date.value.add(dir, 'month');
    this.date.next(value);
  }

  changeDate(value: moment.Moment) {
    this.date.next(value);
  }
}
