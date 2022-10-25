import { Component, OnInit } from '@angular/core';
import { userService } from '../../../shared/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { interval } from 'rxjs';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { DeviceClass } from '../../../shared/classes/devices/device.class';
import { PagerClass } from '../../../shared/classes/pager/pager.class';
import { DeviceLoaderClass } from '../../../shared/classes/devices/device-loader.class';
import { PagerLoaderClass } from '../../../shared/classes/pager/pager-loader.class';
import { GroupLoaderClass } from '../../../shared/classes/groups/group-loader.class';
import { PagerFiltersClass } from '../../../shared/classes/pager/pager-filters.class';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

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

  constructor(
    private user: userService,
    private device: DeviceClass,
    private dLoader: DeviceLoaderClass,
    private pager: PagerClass,
    private pLoader: PagerLoaderClass,
    private group: GroupClass,
    private gLoader: GroupLoaderClass,
    public filters: PagerFiltersClass,
    private myUser: MyUserClass
  ) {}

  get _dLoading() {
    return this.dLoader.loading;
  }
  get _gLoading() {
    return this.gLoader.loading;
  }
  get _pLoading() {
    return this.pLoader.loading;
  }

  get _devices() {
    return this.device.array;
  }

  get _groups() {
    return this.group.array;
  }

  get _messages() {
    return this.pager.messages;
  }

  ngOnInit() {
    const i = interval(300).subscribe(() => {
      if (this.myUser.token) {
        i.unsubscribe();
        this.device.get('all').then();
        this.group.get('all').then();
        this.pager.get().then();
      }
    });
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
