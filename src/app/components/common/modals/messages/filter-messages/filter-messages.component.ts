import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-messages',
  templateUrl: './filter-messages.component.html',
  styleUrls: ['./filter-messages.component.scss'],
})
export class FilterMessagesComponent implements OnInit {
  public filterForm: FormGroup;
  constructor() {
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      'date-from': new FormControl({
        value: null,
        disabled: true,
      }),
      'date-to': new FormControl({
        value: null,
        disabled: true,
      }),
    });
  }

  ngOnInit(): void {}

  asd() {}
}
