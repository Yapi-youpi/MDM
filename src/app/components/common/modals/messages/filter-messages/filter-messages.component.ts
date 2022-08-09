import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment/moment';

@Component({
  selector: 'app-filter-messages',
  templateUrl: './filter-messages.component.html',
  styleUrls: ['./filter-messages.component.scss'],
})
export class FilterMessagesComponent implements OnInit {
  public filterForm: FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  constructor() {
    this.filterForm = new FormGroup({
      status: new FormControl(true),
      dateFrom: new FormControl({
        value: null,
        disabled: true,
      }),
      dateTo: new FormControl({
        value: null,
        disabled: true,
      }),
    });
  }

  ngOnInit(): void {}

  get _dateFrom() {
    console.log(
      this.filterForm.getRawValue()['dateFrom'],
      moment.utc(this.filterForm.getRawValue()['dateFrom']).format()
    );
    return this.filterForm.getRawValue()['dateFrom']
      ? moment.utc(this.filterForm.getRawValue()['dateFrom']).format()
      : null;
  }

  get _dateTo() {
    return this.filterForm.getRawValue()['dateTo']
      ? moment.utc(this.filterForm.getRawValue()['dateTo']).format()
      : null;
  }

  applyFilter() {
    console.log(this.filterForm.value);
    this.onSubmit.emit(this.filterForm.value);
  }

  clearFilter() {
    this.filterForm.reset();
    this.onCancel.emit(this.filterForm.value);
    document.getElementById('filter-messages')?.classList.add('hidden');
  }
}
