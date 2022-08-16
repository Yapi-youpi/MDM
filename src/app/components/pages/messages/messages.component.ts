import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/types/filters';
import { Message } from '../../../shared/types/message';

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
  constructor() {
    this.messages = [
      {
        date: '2022-02-28T12:02:39Z',
        status: true,
        group: '123456',
        text: 'Предлагаем отметить Международный день кошек',
      },
      {
        date: '2022-04-12T15:53:59Z',
        status: true,
        group: 'phone 123',
        text: 'Предлагаем отметить Международный день собак',
      },
      {
        date: '2022-06-03T09:21:31Z',
        status: false,
        group: '789',
        text: 'Предлагаем отметить Международный день попугайчиков',
      },
    ];
  }

  ngOnInit(): void {}

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
