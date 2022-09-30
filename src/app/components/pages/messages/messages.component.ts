import { Component, OnInit } from '@angular/core';
import { IFilter } from '../../../shared/types/filters';
import { Message } from '../../../shared/types/message';
import { pagerService, userService } from '../../../shared/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { interval } from 'rxjs';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { DeviceClass } from '../../../shared/classes/devices/device.class';

registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public title = 'Сообщения';
  public search!: string;
  public isDateSortAsc: boolean = true;
  public isTargetSortAsc: boolean = false;
  public isStatusSortAsc: boolean = false;
  public messages!: Message[];
  public filter: IFilter = {
    status: null,
    dateFrom: null,
    dateTo: null,
  };

  constructor(
    private user: userService,
    private device: DeviceClass,
    private pager: pagerService,
    private group: GroupClass
  ) {}

  get _devices() {
    return this.device.array;
  }

  get _groups() {
    return this.group.array;
  }

  ngOnInit() {
    const i = interval(300).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.device.get('all').then();
        this.group.get('all').then();
        this.getMessages();
      }
    });
  }

  getMessages() {
    this.pager
      .getMessages()
      .then((res) => {
        this.messages = res.sort((a, b) => {
          return b.id - a.id;
        });

        console.log(this.messages);
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
