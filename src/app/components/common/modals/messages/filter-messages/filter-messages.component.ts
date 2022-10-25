import { Component } from '@angular/core';
import { filter } from '../../../../../shared/services/forms/messages';
import { PagerFiltersClass } from '../../../../../shared/classes/pager/pager-filters.class';

@Component({
  selector: 'app-filter-messages',
  templateUrl: './filter-messages.component.html',
  styleUrls: ['./filter-messages.component.scss'],
  providers: [PagerFiltersClass],
})
export class FilterMessagesComponent {
  constructor(private filters: PagerFiltersClass, private form: filter) {}

  get _form() {
    return this.form.form;
  }

  applyFilter() {
    this.filters.setAll();
  }

  clearFilter() {
    this.filters.resetAll();
    const modal = document.querySelector('#filter-messages');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
