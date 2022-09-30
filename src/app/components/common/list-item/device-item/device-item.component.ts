import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { IConfig } from '../../../../shared/types/config';
import { IDevice } from '../../../../shared/types/devices';
import { DeviceSelectedClass } from '../../../../shared/classes/devices/device-selected.class';
import { DeviceClass } from '../../../../shared/classes/devices/device.class';
import { edit } from '../../../../shared/services/forms/device';
import { GroupClass } from '../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
})
export class DeviceItemComponent {
  @Input() public device!: IDevice;
  @Input() public configs!: IConfig[];
  @Input() public userRole!: string;

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  constructor(
    private groups: GroupClass,
    private selection: DeviceSelectedClass,
    private devices: DeviceClass,
    private form: edit
  ) {}

  get _groups() {
    return this.groups.array;
  }

  displayTip() {
    if (
      this.nameRef.nativeElement.offsetWidth <
      this.nameRef.nativeElement.scrollWidth
    ) {
      this.tipRef.nativeElement.style.visibility = 'visible';
      this.tipRef.nativeElement.style.opacity = 1;
    }
  }
  hideTip() {
    this.tipRef.nativeElement.style.visibility = 'hidden';
    this.tipRef.nativeElement.style.opacity = 0;
  }

  onSelectUnselectDeviceHandler(device: IDevice) {
    this.selection.selectUnselectSingleDevice(device);
  }

  onChangeDeviceStateHandler(device: IDevice) {
    this.devices
      .edit([
        {
          ...device,
          active_state: !device.active_state,
        },
      ])
      .then();
  }

  onClickDeviceQRCodeHandler(device: IDevice) {
    this.devices.setCurrent(device);
  }

  onClickDeviceEditHandler(device: IDevice) {
    this.devices.setCurrent(device);
    this.form.form.patchValue(device);
  }

  onClickDeviceDeleteHandler(device: IDevice) {
    this.devices.setCurrent(device);
  }

  onClickDeviceReloadHandler(device: IDevice) {
    this.devices.reload(device.device_id).then();
  }

  onClickDeviceFilesHandler(device: IDevice) {
    this.devices.setCurrent(device);
  }
}
