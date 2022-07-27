import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { appsPaths as api } from '../../../../shared/enums/api';
import { App } from '../../../../shared/types/apps';

@Component({
  selector: 'app-apps-config',
  templateUrl: './apps-config.component.html',
  styleUrls: ['./apps-config.component.scss'],
})
export class AppsConfigComponent implements OnInit {
  @Input() apps: App[] = [];
  @Input() appsInConfig: string[] = [];

  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';
  public isOnlySystemApps: boolean = false;
  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isPositionSortAsc: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.isOnlySystemApps = !this.isOnlySystemApps;
  }

  toggleNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  toggleSizeSortDir() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }
  togglePositionSortDir() {
    this.isPositionSortAsc = !this.isPositionSortAsc;
  }
}
