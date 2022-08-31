import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/types/filters';
import { Message } from '../../../shared/types/message';
import {
  alertService,
  deviceService,
  groupService,
  pagerService,
  userService,
} from '../../../shared/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import * as states from '../../../shared/types/states';
import { Device } from '../../../shared/types/devices';
import { DevicesGroup } from '../../../shared/types/groups';
import { interval } from 'rxjs';

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
  public devices: Device[] = [];
  public groups: DevicesGroup[] = [];
  public filter: Filter = {
    status: null,
    dateFrom: null,
    dateTo: null,
  };
  constructor(
    private user: userService,
    private device: deviceService,
    private pager: pagerService,
    private group: groupService,
    private alert: alertService
  ) {}

  ngOnInit() {
    const i = interval(300).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.getDevices();
        this.getGroups('all');
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

  getDevices() {
    this.device
      .get('all')
      .then((res: states.DevicesState) => {
        if (res.success) {
          this.devices = res.devices ? res.devices : [];
        } else {
          this.alert.show({
            title: 'GET DEVICES ERROR',
            content: res.error,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  getGroups(param: string) {
    this.group
      .get(param)
      .then((res: states.DevicesGroupsState) => {
        if (res.success) {
          this.groups = res.devicesGroups ? res.devicesGroups : [];
        } else {
          this.alert.show({
            title: 'GET GROUPS ERROR',
            content: res.error,
          });
        }
      })
      .catch((err) => console.log(err));
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
