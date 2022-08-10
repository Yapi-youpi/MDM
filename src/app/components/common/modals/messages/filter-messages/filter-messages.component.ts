import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  applyFilter() {
    this.onSubmit.emit(this.filterForm.value);
  }

  clearFilter() {
    this.filterForm.reset();
    this.onCancel.emit(this.filterForm.value);
    document.getElementById('filter-messages')?.classList.add('hidden');
  }
}
