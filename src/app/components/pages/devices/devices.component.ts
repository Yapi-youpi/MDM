import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import {
  alertService,
  deviceConfigService,
  userService,
} from '../../../shared/services';
import { device, files } from 'src/app/shared/services/forms';
import { DatabaseService } from '../../../shared/services/database.service';
import { IDevice } from '../../../shared/types/devices';
import { IConfig } from '../../../shared/types/config';
import { AssetService } from '../../../shared/services/asset.service';
import { IFile } from '../../../shared/types/files';
import { DeviceClass } from '../../../shared/classes/devices/device.class';
import { DeviceSubscriptionClass } from '../../../shared/classes/devices/device-subscription.class';
import { DeviceFiltersClass } from '../../../shared/classes/devices/device-filters.class';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { FileClass } from '../../../shared/classes/files/file.class';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DeviceSubscriptionClass, DeviceFiltersClass],
})
export class DevicesComponent implements OnInit, OnDestroy {
  public title = 'Устройства';

  public loading: boolean = true;

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
    private groups: GroupClass,
    private config: deviceConfigService,
    private device: DeviceClass,
    private subDevice: DeviceSubscriptionClass,
    private addDeviceForm: device.add,
    private editDeviceForm: device.edit,
    private editSeveralDevicesForm: device.editSeveral,
    private filterForm: device.filter,
    public filters: DeviceFiltersClass,
    private alert: alertService,
    private asset: AssetService,
    private files: FileClass,
    private fileForm: files.add
  ) {}

  get _devices() {
    return this.device.array;
  }

  get _selectedDevices() {
    return this.device.selectedIDs;
  }

  get _groups() {
    return this.groups.array;
  }

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
        this.subDevice.subscribe().then();
      }
    });

    this.subDevice.setParseQuery();
  }

  ngOnDestroy() {
    this.subDevice.unsubscribe();
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
    this.groups.get('all');
  }

  getDevices() {
    this.device.get('all');
  }

  cancelSelection() {
    this.device.setListOfSelected([]);

    if (this.isAllSelected) this.isAllSelected = false;

    this.device.setSelectionTotal(false);
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
    this.filters.resetAll();
  }

  resetOneSearchParam(
    type: 'status' | 'dateFrom' | 'dateTo' | 'configsIDs' | 'groupsIDs',
    value?: string
  ) {
    this.filters.resetParam(type, value);
  }

  searchDevicesWithParams() {
    this.cancelSelection();

    this.filters.setParams();
  }

  addDevice() {
    this.device
      .add({
        name: this.addDeviceForm._name,
        description: this.addDeviceForm._desc,
        device_group_id: this.addDeviceForm._group,
      })
      .then((res) => {
        if (res) {
          const modalAdd = document.querySelector('#add_device');
          if (!modalAdd?.classList.contains('hidden'))
            modalAdd?.classList.toggle('hidden');

          const modalQR = document.querySelector('#qr_code');
          if (!modalQR?.classList.contains('hidden'))
            modalQR?.classList.toggle('hidden');

          this.addDeviceForm.resetForm();
        }
      });
  }

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.device.setSelectionTotal(this.isAllSelected);

    if (this.isAllSelected) this.device.setListOfSelected(this.device.array);
    else this.device.setListOfSelected([]);
  }

  selectUnselectDevice(device: IDevice) {
    this.device.setElementSelection(device);

    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
    if (this.device.selectedIDs.length === this.device.array.length)
      this.isAllSelected = true;
  }

  changeDeviceState(device: IDevice) {
    this.device
      .edit([
        {
          ...device,
          active_state: !device.active_state,
        },
      ])
      .then();
  }

  setCurrentDevice(device: IDevice, isToEdit: boolean = false) {
    this.device.setCurrent(device);
    if (isToEdit) this.editDeviceForm.form.patchValue(device);
  }

  addFile() {
    const device = this.device.current.value;

    if (device) {
      this.files
        .upload('device', device.device_id, this.fileForm._file)
        .then((res) => {
          if (res) {
            this.fileForm.resetForm();

            const modal = document.querySelector('#file_add');
            if (!modal?.classList.contains('hidden'))
              modal?.classList.toggle('hidden');
          }
        });
    }
  }

  setCurrentFile(file: IFile) {
    this.files.setCurrent(file);
  }

  deleteFile() {
    const device = this.device.current.value;
    const file = this.files.current.value;

    if (device && file) {
      this.files.delete('device', device.device_id, file.fileID).then((res) => {
        if (res) {
          const modal = document.querySelector('#file_delete');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        }
      });
    }
  }

  editDevice() {
    if (this.device.current.value) {
      this.device
        .edit([
          {
            ...this.device.current.value,
            name: this.editDeviceForm._name,
            description: this.editDeviceForm._description,
            device_group_id: this.editDeviceForm._group_id,
          },
        ])
        .then((res) => {
          if (res) {
            const modal = document.querySelector('#edit_device');
            if (!modal?.classList.contains('hidden'))
              modal?.classList.toggle('hidden');
          }
        });
    }
  }

  editSeveralDevices() {
    const data: IDevice[] = this.device.array
      .filter((d) => this.device.selectedIDs.includes(d.device_id))
      .map((d) => {
        return {
          ...d,
          device_group_id: this.editSeveralDevicesForm._group,
          active_state: this.editSeveralDevicesForm._state,
        };
      });

    this.device.edit(data).then((res) => {
      if (res) {
        const modal = document.querySelector('#edit_several_devices');
        if (!modal?.classList.contains('hidden'))
          modal?.classList.toggle('hidden');
      }
    });
  }

  deleteDevice() {
    if (this.device.current.value) {
      this.device.delete([this.device.current.value?.device_id]).then((res) => {
        if (res) {
          const modal = document.querySelector('#delete_device');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        }
      });
    }
  }

  deleteSeveralDevices() {
    this.device.delete(this.device.selectedIDs).then((res) => {
      if (res) {
        const modal = document.querySelector('#delete_several_elements');
        if (!modal?.classList.contains('hidden'))
          modal?.classList.toggle('hidden');
      }
    });
  }

  rebootDevice(device: IDevice) {
    this.device.reload(device.device_id);
  }
}
