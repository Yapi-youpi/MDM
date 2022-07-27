import { Component, ElementRef, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { Device } from '../../../shared/types/devices';
import { DevicesGroup } from '../../../shared/types/groups';
import { DevicesConfig } from '../../../shared/types/config';
import { DevicesFilter } from '../../../shared/types/interfaces';
import { DevicesState, SingleDeviceState } from '../../../shared/types/states';
import * as states from '../../../shared/types/states';

import {
  deviceService,
  deviceConfigService,
  formService,
  groupService,
  userService,
} from '../../../shared/services';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  public devices: Device[] = [];
  public groups: DevicesGroup[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;

  public currDevice!: Device;

  public selectedDevicesIDs: string[] = [];
  public isAllSelected: boolean = false;

  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortBatteryAsc: boolean = true;

  public searchParam: string = '';

  public devicesFilters: DevicesFilter = {
    status: null,
    dateFrom: null,
    dateTo: null,
    configsIDs: null,
    groupsIDs: null,
  };

  // public db: DatabaseService
  constructor(
    public user: userService,
    // private userPasswordService: formService.user.changePass,
    private elementRef: ElementRef,
    private group: groupService,
    private config: deviceConfigService,
    private device: deviceService,
    private addDeviceForm: formService.device.add,
    private editDeviceForm: formService.device.edit,
    private editSeveralDevicesForm: formService.device.editSeveral,
    private filterForm: formService.device.filter
  ) {}

  ngOnInit(): void {
    const i = interval(1000).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.getGroups();
        this.getConfigs();
        this.getDevices();
      }
    });
  }

  // changePassword() {
  //   this.user
  //     .changePassword(this.userPasswordService._pass)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // }

  getConfigs() {
    this.config
      .getConfig('all')
      .then((res) => {
        this.configs = res;
        // console.log(res)
        // if (res.success) {
        //   this.configs = res.devicesConfigs;
        // } else {
        //   console.log(res.error);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGroups() {
    this.group
      .getGroups('all')
      .then((res: states.DevicesGroupsState) => {
        if (res.success) {
          this.groups = res.devicesGroups;
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDevices() {
    this.loading = true;

    this.device
      .get('all')
      .then((res: states.DevicesState) => {
        console.log(res);
        if (res.success) {
          this.loading = false;
          this.devices = res.devices;
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cancelSelection() {
    this.selectedDevicesIDs = [];

    if (this.isAllSelected) this.isAllSelected = false;

    this.devices.map((d) => {
      if (d.isSelected) d.isSelected = false;
    });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  resetSearchParams() {
    this.devicesFilters.status = null;
    this.devicesFilters.dateFrom = null;
    this.devicesFilters.dateTo = null;
    this.devicesFilters.configsIDs = null;
    this.devicesFilters.groupsIDs = null;
  }

  searchDevicesWithParams() {
    this.cancelSelection();

    this.devicesFilters.status = this.filterForm._status;
    this.devicesFilters.dateFrom = this.filterForm._dateFrom;
    this.devicesFilters.dateTo = this.filterForm._dateTo;
    this.devicesFilters.groupsIDs = this.filterForm._groupsIDs;
    this.devicesFilters.configsIDs = this.filterForm._configsIDs;
  }

  addDevice() {
    this.device
      .add({
        name: this.addDeviceForm._name,
        description: this.addDeviceForm._desc,
        device_group_id: this.addDeviceForm._group,
      })
      .then((res: SingleDeviceState) => {
        if (res.success) {
          this.currDevice = res.device;
          this.devices = [res.device, ...this.devices];

          const modalAdd = document.querySelector('#add_device');
          modalAdd?.classList.toggle('hidden');

          const modalQR = document.querySelector('#qr_code');
          modalQR?.classList.toggle('hidden');
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.devices.map((d) => {
      d.isSelected = this.isAllSelected;
    });

    if (this.isAllSelected)
      this.selectedDevicesIDs = this.devices.map((d) => d.device_id);
    else this.selectedDevicesIDs = [];
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

  selectUnselectDevice(device: Device) {
    this.devices.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedDevicesIDs.includes(d.device_id))
          this.selectedDevicesIDs.push(d.device_id);

        if (!d.isSelected && this.selectedDevicesIDs.includes(d.device_id))
          this.selectedDevicesIDs = this.selectedDevicesIDs.filter(
            (sd) => sd !== d.device_id
          );
      }
    });
    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
    if (this.selectedDevicesIDs.length === this.devices.length)
      this.isAllSelected = true;
  }

  changeDeviceState(device: Device) {
    this.device
      .edit([
        {
          ...device,
          active_state: !device.active_state,
        },
      ])
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${device.name} изменено`);

          this.devices.map((d) => {
            if (d === device) {
              d.active_state = !d.active_state;
            }
          });
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDeviceQRCode(device: Device) {
    this.currDevice = device;
  }

  selectDeviceToEdit(device: Device) {
    this.currDevice = device;
    this.editDeviceForm.form.patchValue(device);
  }

  editDevice() {
    this.device
      .edit([
        {
          ...this.currDevice,
          name: this.editDeviceForm._name,
          description: this.editDeviceForm._description,
          device_group_id: this.editDeviceForm._group_id,
        },
      ])
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${this.currDevice.name} изменено`);

          this.devices.map((d) => {
            if (d.device_id === this.currDevice.device_id) {
              d.name = this.editDeviceForm._name;
              d.description = this.editDeviceForm._description;
              d.device_group_id = this.editDeviceForm._group_id;
            }
          });

          const modal = document.querySelector('#edit_device');
          modal?.classList.toggle('hidden');
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editSeveralDevices() {
    const data: Device[] = this.devices
      .filter((d) => this.selectedDevicesIDs.includes(d.device_id))
      .map((d) => {
        return {
          ...d,
          device_group_id: this.editSeveralDevicesForm._group,
          active_state: this.editSeveralDevicesForm._state,
        };
      });

    this.device
      .edit(data)
      .then((res: DevicesState) => {
        if (res.success) {
          data.forEach((el) => {
            this.devices = this.devices.map((d) => {
              if (d.device_id === el.device_id) {
                return {
                  ...d,
                  device_group_id: el.device_group_id,
                  active_state: el.active_state,
                  isSelected: false,
                };
              } else return d;
            });
          });

          this.selectedDevicesIDs = [];

          const modal = document.querySelector('#edit_several_devices');
          modal?.classList.toggle('hidden');
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectDeviceToDelete(device: Device) {
    this.currDevice = device;
  }

  deleteDevice(device: Device) {
    this.device
      .delete([device.device_id])
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${device.name} удалено`);

          this.devices = this.devices.filter((d) => d !== device);
          this.selectedDevicesIDs = this.selectedDevicesIDs.filter(
            (d) => d !== device.device_id
          );

          const modal = document.querySelector('#delete_device');
          modal?.classList.toggle('hidden');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteSeveralDevices() {
    this.device
      .delete(this.selectedDevicesIDs)
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройства удалены`);

          this.selectedDevicesIDs.forEach((sd) => {
            this.devices = this.devices.filter((d) => d.device_id !== sd);
          });

          this.selectedDevicesIDs = [];

          const modal = document.querySelector('#delete_several_elements');
          modal?.classList.toggle('hidden');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
