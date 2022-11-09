import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { inputWidth } from '../../../../../shared/types/input';

@Component({
  selector: 'app-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.scss'],
})
export class InputDatetimeComponent {
  @Input() name: string = '';
  @Input() width: inputWidth = 'w-170';
  @Input() control: FormControl = new FormControl(null);
  @Input() controlName?;
  @Input() groupName?: FormGroup;
  @Input() isError: boolean = false;

  public currDay!: moment.Moment;

  constructor() {}

  showDatetimePicker() {
    const modal = document.querySelector(`#datetime_picker_${this.name}`);
    modal?.classList.toggle('hidden');
  }

  selectDay(day: moment.Moment) {
    this.currDay = day;
    this.control?.setValue(moment(day).format('YYYY-MM-DDTHH:mm:ss') + 'Z');

    if (this.groupName) {
      this.groupName.setValue({
        ...this.groupName.value,
        [this.controlName]: moment(day).format(),
      });
    }
  }
}
