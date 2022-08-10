import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import 'moment/locale/ru';

import { DateService } from '../../../../shared/services/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent implements OnInit {
  @Input() name: string = '';

  public calendar: Week[] = [];
  public isHourFocused: boolean = false;
  public isMinuteFocused: boolean = false;
  public hour: string = '00';
  public minute: string = '00';
  public currDate!: moment.Moment;

  @Output() onSubmit = new EventEmitter<moment.Moment>();

  constructor(public dateService: DateService) {}

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
    this.currDate = moment(this.dateService.date.value);
  }

  get _prev() {
    return moment(this.dateService.date.value).add(-1, 'month');
  }

  get _next() {
    return moment(this.dateService.date.value).add(1, 'month');
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar: Week[] = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected,
            };
          }),
      });
    }

    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
    this.currDate = day;
  }

  go(dir: number, day: moment.Moment) {
    this.dateService.changeMonth(dir);
    this.currDate = day;
  }

  setHour(hour: string) {
    if (Number(hour) > 23) this.hour = '23';
    if (Number(hour) < 0 || hour === '') this.hour = '00';
  }

  setMinute(minute: string) {
    if (Number(minute) > 59) this.minute = '59';
    if (Number(minute) < 0 || minute === '') this.minute = '00';
  }

  onSubmitHandler() {
    if (this.hour.length === 1) this.hour = '0' + this.hour;
    if (this.minute.length === 1) this.minute = '0' + this.minute;

    const date = this.currDate.set({
      date: this.currDate.date(),
      month: this.currDate.month(),
      h: Number(this.hour),
      m: Number(this.minute),
    });

    this.dateService.changeDate(date);
    this.onSubmit.emit(date);
    document
      .querySelector(`#datetime_picker_${this.name}`)
      ?.classList.add('hidden');
  }
}
