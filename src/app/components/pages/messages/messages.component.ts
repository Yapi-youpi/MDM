import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/types/filters';
import { Message } from '../../../shared/types/message';
import { pagerService } from '../../../shared/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public title = 'Сообщения';
  public search!: string;
  public isDateSortAsc: boolean = false;
  public isTargetSortAsc: boolean = false;
  public isStatusSortAsc: boolean = false;
  public messages!: Message[];
  public filter: Filter = {
    status: null,
    dateFrom: null,
    dateTo: null,
  };
  constructor(private pager: pagerService) {}

  ngOnInit() {
    this.pager
      .getMessages()
      .then((res) => {
        this.messages = res;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetFilterParams() {
    this.filter.status = null;
    this.filter.dateFrom = null;
    this.filter.dateTo = null;
  }

  applyFilterParams(form) {
    this.filter.status = form.status;
    this.filter.dateFrom = form.dateFrom;
    this.filter.dateTo = form.dateTo;
  }

  toggleDateSortDir() {
    this.isDateSortAsc = !this.isDateSortAsc;
  }

  toggleTargetSortDir() {
    this.isTargetSortAsc = !this.isTargetSortAsc;
  }

  toggleStatusSortDir() {
    this.isStatusSortAsc = !this.isStatusSortAsc;
  }
}
