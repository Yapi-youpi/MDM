import { Injectable } from '@angular/core';
import { filterMessages } from '../../services/forms/messages';

@Injectable({
  providedIn: 'root',
})
export class PagerFiltersClass {
  status: boolean | null = null;
  dateFrom: string | null = null;
  dateTo: string | null = null;

  constructor(private form: filterMessages) {}

  resetAll() {
    this.status = null;
    this.dateFrom = null;
    this.dateTo = null;

    this.form.reset();
  }

  setAll() {
    if (this.form.values) {
      this.status = this.form.values.status;
      this.dateFrom = this.form.values.dateFrom;
      this.dateTo = this.form.values.dateTo;
    }
  }
}
