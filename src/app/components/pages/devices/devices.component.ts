import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { userService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import {
  ConfigClass,
  DeviceClass,
  DeviceFiltersClass,
  DeviceSelectedClass,
  DeviceSubscriptionClass,
  GroupClass,
  LoaderClass,
} from '../../../shared/classes';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

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
    private groups: GroupClass,
    private config: ConfigClass,
    private subDevice: DeviceSubscriptionClass,
    public filters: DeviceFiltersClass,
    private asset: AssetService,
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
    return this.groups.array;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        i.unsubscribe();
        this.groups.get('all').then();
        this.config.get('all').then();
        this.device.get('all').then();
        this.asset.get('user-role').then((role: string) => {
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
