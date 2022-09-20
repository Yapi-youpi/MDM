import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { LiveQuerySubscription } from 'parse';
import {
  alertService,
  deviceConfigService,
  deviceService,
  filesService,
  groupService,
  userService,
} from '../../../shared/services';
import { device, files } from 'src/app/shared/services/forms';
import { DatabaseService } from '../../../shared/services/database.service';
import { Device } from '../../../shared/types/devices';
import { DevicesGroup } from '../../../shared/types/groups';
import { DevicesConfig } from '../../../shared/types/config';
import { DevicesFilter } from '../../../shared/types/filters';
import * as states from '../../../shared/types/states';
import { AssetService } from '../../../shared/services/asset.service';
import { IFile } from '../../../shared/types/files';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit, OnDestroy {
  private query!: Parse.Query;
  private sub!: LiveQuerySubscription;

  public title = 'Устройства';
  public devices: Device[] = [];
  public groups: DevicesGroup[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;
  public currDevice!: Device;
  public currFile: IFile | null = null;
  public selectedDevicesIDs: string[] = [];
  public isAllSelected: boolean = false;
  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortBatteryAsc: boolean = true;
  public searchParam: string = '';
  public userRole: string = '';
  public filter: DevicesFilter = {
    status: null,
    dateFrom: null,
    dateTo: null,
    configsIDs: null,
    groupsIDs: null,
  };
  constructor(
    private db: DatabaseService,
    private user: userService,
    private elementRef: ElementRef,
    private group: groupService,
    private config: deviceConfigService,
    private device: deviceService,
    private addDeviceForm: device.add,
    private editDeviceForm: device.edit,
    private editSeveralDevicesForm: device.editSeveral,
    private filterForm: device.filter,
    private alert: alertService,
    private asset: AssetService,
    private files: filesService.devicesFiles,
    private fileForm: files.add
  ) {}

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.getGroups();
        this.getConfigs();
        this.getDevices();
        this.asset.getFromStorage('user-role').then((role: string) => {
          this.userRole = role;
        });
        this.subscribeOnServer().then();
      }
    });

    this.query = this.db.query('Device');
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    this.resetSearchParams();
    this.filterForm.reset();
  }

  getConfigs() {
    this.loading = true;

    this.config
      .getConfig('all')
      .then((res) => (this.configs = res))
      .catch((err) => {
        this.alert.show({
          title: 'GET CONFIGS ERROR',
          content: err.error,
        });
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  getGroups() {
    this.loading = true;

    this.group
      .get('all')
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
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  getDevices() {
    this.loading = true;

    this.device
      .get('all')
      .then((res: states.DevicesState) => {
        console.log(res);
        if (res.success) {
          this.devices = res.devices
            ? res.devices.map((d) => ({ ...d, isSelected: false }))
            : [];
        } else {
          this.alert.show({
            title: 'GET DEVICES ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  async subscribeOnServer() {
    this.sub = await this.query.subscribe();

    // this.sub.on("open", () => {
    //   console.log("Соединение открыто");
    // });
    // this.sub.on("close", () => {
    //   console.log("Соединение Закрыто");
    // });

    this.sub.on('update', (item) => {
      const device: Device = item.attributes as Device;

      this.devices = [
        ...this.devices.map((d) => {
          if (d.device_id === device.device_id)
            return { ...device, isSelected: d.isSelected };
          else return d;
        }),
      ];
    });

    this.sub.on('delete', (item) => {
      const device: Device = item.attributes as Device;

      this.devices = this.devices.filter(
        (d) => d.device_id !== device.device_id
      );
    });

    this.sub.on('create', (item) => {
      const device: Device = item.attributes as Device;

      this.devices = [device, ...this.devices];
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

  resetSearchParams() {
    this.filter.status = null;
    this.filter.dateFrom = null;
    this.filter.dateTo = null;
    this.filter.configsIDs = null;
    this.filter.groupsIDs = null;
  }

  resetOneSearchParam(
    type: 'status' | 'dateFrom' | 'dateTo' | 'configsIDs' | 'groupsIDs',
    value?: string
  ) {
    switch (type) {
      case 'status': {
        this.filter.status = null;
        if (this.filterForm.form.controls['status-on'].value === true)
          this.filterForm.form.controls['status-on'].setValue(false);
        if (this.filterForm.form.controls['status-off'].value === true)
          this.filterForm.form.controls['status-off'].setValue(false);
        break;
      }
      case 'dateFrom': {
        this.filter.dateFrom = null;
        this.filterForm.form.controls['date-from'].setValue(null);
        break;
      }
      case 'dateTo': {
        this.filter.dateTo = null;
        this.filterForm.form.controls['date-to'].setValue(null);
        break;
      }
      case 'configsIDs': {
        if (value) {
          const prevValues: string[] =
            this.filterForm.form.controls['config_ids'].value;
          const newValues = prevValues.filter((c) => c !== value);
          this.filterForm.form.controls['config_ids'].setValue(newValues);
          this.filter.configsIDs = newValues;
        }
        break;
      }
      case 'groupsIDs': {
        if (value) {
          const prevValues: string[] =
            this.filterForm.form.controls['group_ids'].value;
          const newValues = prevValues.filter((c) => c !== value);
          this.filterForm.form.controls['group_ids'].setValue(newValues);
          this.filter.groupsIDs = newValues;
        }
        break;
      }
      default:
        return;
    }
  }

  searchDevicesWithParams() {
    this.cancelSelection();

    this.filter.status = this.filterForm._status;
    this.filter.dateFrom = this.filterForm._dateFrom;
    this.filter.dateTo = this.filterForm._dateTo;
    this.filter.groupsIDs = this.filterForm._groupsIDs;
    this.filter.configsIDs = this.filterForm._configsIDs;
  }

  addDevice() {
    this.loading = true;

    this.device
      .add({
        name: this.addDeviceForm._name,
        description: this.addDeviceForm._desc,
        device_group_id: this.addDeviceForm._group,
      })
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          if (res.device) this.currDevice = res.device;

          const modalAdd = document.querySelector('#add_device');
          if (!modalAdd?.classList.contains('hidden'))
            modalAdd?.classList.toggle('hidden');

          const modalQR = document.querySelector('#qr_code');
          if (!modalQR?.classList.contains('hidden'))
            modalQR?.classList.toggle('hidden');

          this.addDeviceForm.resetForm();
        } else {
          this.alert.show({
            title: 'ADD DEVICE ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
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
    this.loading = true;

    this.device
      .edit([
        {
          ...device,
          active_state: !device.active_state,
        },
      ])
      .then((res: states.SingleDeviceState) => {
        if (res.error)
          this.alert.show({
            title: 'CHANGE DEVICE STATE ERROR',
            content: res.error,
          });
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  getDeviceFiles(device: Device) {
    this.currDevice = device;
  }

  addFile() {
    this.loading = true;

    this.files
      .upload(this.currDevice.device_id, this.fileForm._file)
      .then((res) => {
        if (res.success) {
          if (this.currDevice.device_info.files) {
            if (this.currDevice.device_info.files?.length !== 0) {
              this.currDevice.device_info.files = [
                res.file,
                ...this.currDevice.device_info.files,
              ];
            } else {
              this.currDevice.device_info.files.push(res.file);
            }
          } else {
            this.currDevice.device_info.files = [res.file];
          }

          this.currFile = null;

          this.fileForm.resetForm();

          const modal = document.querySelector('#file_add');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'ADD FILE ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  selectFileToDelete(file: IFile) {
    this.currFile = file;
  }

  deleteFile(file: IFile) {
    this.loading = true;

    this.files
      .delete(this.currDevice.device_id, file.fileID)
      .then((res) => {
        if (res.success) {
          if (this.currDevice.device_info.files)
            this.currDevice.device_info.files =
              this.currDevice.device_info.files?.filter(
                (f) => f.fileID !== file.fileID
              );

          const modal = document.querySelector('#file_delete');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          console.log(res.error);
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
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
    this.loading = true;

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
          const modal = document.querySelector('#edit_device');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT DEVICE ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  editSeveralDevices() {
    this.loading = true;

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
      .then((res: states.DevicesState) => {
        if (res.success) {
          this.selectedDevicesIDs = [];

          const modal = document.querySelector('#edit_several_devices');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT SEVERAL DEVICES ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  selectDeviceToDelete(device: Device) {
    this.currDevice = device;
  }

  deleteDevice(device: Device) {
    this.loading = true;

    this.device
      .delete([device.device_id])
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          const modal = document.querySelector('#delete_device');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        }
        if (res.error)
          this.alert.show({
            title: 'DELETE DEVICE ERROR',
            content: res.error,
          });
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  deleteSeveralDevices() {
    this.loading = true;

    this.device
      .delete(this.selectedDevicesIDs)
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          this.selectedDevicesIDs = [];

          const modal = document.querySelector('#delete_several_elements');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'DELETE SEVERAL DEVICES ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        const t = timer(500).subscribe(() => {
          t.unsubscribe();
          this.loading = false;
        });
      });
  }

  rebootDevice(device: Device) {
    this.device
      .reload(device.device_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
