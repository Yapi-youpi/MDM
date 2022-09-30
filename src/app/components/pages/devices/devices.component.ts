import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { userService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import { DeviceClass } from '../../../shared/classes/devices/device.class';
import { DeviceSubscriptionClass } from '../../../shared/classes/devices/device-subscription.class';
import { DeviceFiltersClass } from '../../../shared/classes/devices/device-filters.class';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { DeviceLoaderClass } from '../../../shared/classes/devices/device-loader.class';
import { GroupLoaderClass } from '../../../shared/classes/groups/group-loader.class';
import { DeviceSelectedClass } from '../../../shared/classes/devices/device-selected.class';
import { ConfigClass } from '../../../shared/classes/configs/config.class';
import { ConfigLoaderClass } from '../../../shared/classes/configs/config-loader.class';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DeviceSubscriptionClass, DeviceFiltersClass],
})
export class DevicesComponent implements OnInit, OnDestroy {
  public title = 'Устройства';

  public isAllSelected: boolean = false;

  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortBatteryAsc: boolean = true;

  public searchParam: string = '';

  public userRole: string = '';

  constructor(
    private user: userService,
    private device: DeviceClass,
    private dSelected: DeviceSelectedClass,
    private dLoader: DeviceLoaderClass,
    private groups: GroupClass,
    private gLoader: GroupLoaderClass,
    private config: ConfigClass,
    private cLoader: ConfigLoaderClass,
    private subDevice: DeviceSubscriptionClass,
    public filters: DeviceFiltersClass,
    private asset: AssetService
  ) {}

  get _cLoading() {
    return this.cLoader.loading;
  }

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
        this.config.get('all').then();
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
