import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import {
  alertService,
  deviceConfigService,
  userService,
} from '../../../shared/services';
import { device } from 'src/app/shared/services/forms';
import { DatabaseService } from '../../../shared/services/database.service';
import { IConfig } from '../../../shared/types/config';
import { AssetService } from '../../../shared/services/asset.service';
import { IFile } from '../../../shared/types/files';
import { DeviceClass } from '../../../shared/classes/devices/device.class';
import { DeviceSubscriptionClass } from '../../../shared/classes/devices/device-subscription.class';
import { DeviceFiltersClass } from '../../../shared/classes/devices/device-filters.class';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { DeviceLoaderClass } from '../../../shared/classes/devices/device-loader.class';
import { GroupLoaderClass } from '../../../shared/classes/groups/group-loader.class';
import { DeviceSelectedClass } from '../../../shared/classes/devices/device-selected.class';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DeviceSubscriptionClass, DeviceFiltersClass],
})
export class DevicesComponent implements OnInit, OnDestroy {
  public title = 'Устройства';

  public configs: IConfig[] = [];

  public currFile: IFile | null = null;
  public isAllSelected: boolean = false;

  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortBatteryAsc: boolean = true;

  public searchParam: string = '';

  public userRole: string = '';

  constructor(
    private db: DatabaseService,
    private user: userService,
    private elementRef: ElementRef,
    private device: DeviceClass,
    private dSelected: DeviceSelectedClass,
    private dLoader: DeviceLoaderClass,
    private groups: GroupClass,
    private gLoader: GroupLoaderClass,
    private config: deviceConfigService,
    private subDevice: DeviceSubscriptionClass,
    private addDeviceForm: device.add,
    private editDeviceForm: device.edit,
    private editSeveralDevicesForm: device.editSeveral,
    private filterForm: device.filter,
    public filters: DeviceFiltersClass,
    private alert: alertService,
    private asset: AssetService
  ) {}

  get _dLoading() {
    return this.dLoader.loading;
  }

  get _gLoading() {
    return this.gLoader.loading;
  }

  get _devices() {
    return this.device.array;
  }

  get _groups() {
    return this.groups.array;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.groups.get('all').then();
        this.getConfigs();
        this.device.get('all').then();
        this.asset.getFromStorage('user-role').then((role: string) => {
          this.userRole = role;
        });
        this.subDevice.subscribe().then();
      }
    });

    this.subDevice.setParseQuery();
  }

  ngOnDestroy() {
    this.subDevice.unsubscribe();
  }

  getConfigs() {
    // this.loading = true;

    this.config
      .get('all')
      .then((res) => {
        if (res) this.configs = res;
      })
      .catch((err) => {
        this.alert.show({
          title: 'GET CONFIGS ERROR',
          content: err.error,
        });
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          // this.loading = false;
        });
      });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  changeSortStatusDir() {
    this.sortStatusAsc = !this.sortStatusAsc;
  }
  changeSortDateDir() {
    this.sortDateAsc = !this.sortDateAsc;
  }
  changeSortNameDir() {
    this.sortNameAsc = !this.sortNameAsc;
  }
  changeSortGroupDir() {
    this.sortGroupAsc = !this.sortGroupAsc;
  }
  changeSortBatteryDir() {
    this.sortBatteryAsc = !this.sortBatteryAsc;
  }

  selectUnselectDevices() {
    this.dSelected.selectUnselectDevices();
  }
}
