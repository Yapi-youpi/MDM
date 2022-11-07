import { Component, OnInit } from '@angular/core';
import { userService } from '../../../shared/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { interval } from 'rxjs';
import {
  DeviceClass,
  GroupClass,
  LoaderClass,
  PagerClass,
  PagerFiltersClass,
} from '../../../shared/classes';
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
    private pager: PagerClass,
    private group: GroupClass,
    public filters: PagerFiltersClass,
    private myUser: MyUserClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
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
