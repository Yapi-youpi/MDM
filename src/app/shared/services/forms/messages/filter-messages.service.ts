import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilterMessagesService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      status: new FormControl(true),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  reset() {
    this.form.reset();
  }
}
