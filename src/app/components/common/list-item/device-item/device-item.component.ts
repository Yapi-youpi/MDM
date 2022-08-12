import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DevicesConfig } from '../../../../shared/types/config';
import { DevicesGroup } from '../../../../shared/types/groups';
import { Device } from '../../../../shared/types/devices';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
})
export class DeviceItemComponent {
  @Input() public device!: Device;
  @Input() public configs!: DevicesConfig[];
  @Input() public groups!: DevicesGroup[];
  @Input() userRole!: string;

  @Output() onSelectUnselectDevice = new EventEmitter<Device>();
  @Output() onChangeDeviceState = new EventEmitter<Device>();
  @Output() onClickDeviceQRCode = new EventEmitter<Device>();
  @Output() onClickDeviceEdit = new EventEmitter<Device>();
  @Output() onClickDeviceDelete = new EventEmitter<Device>();

  constructor() {}

  onSelectUnselectDeviceHandler(device: Device) {
    this.onSelectUnselectDevice.emit(device);
  }

  onChangeDeviceStateHandler(device: Device) {
    this.onChangeDeviceState.emit(device);
  }

  onClickDeviceQRCodeHandler(device: Device) {
    this.onClickDeviceQRCode.emit(device);
  }

  onClickDeviceEditHandler(device: Device) {
    this.onClickDeviceEdit.emit(device);
  }

  onClickDeviceDeleteHandler(device: Device) {
    this.onClickDeviceDelete.emit(device);
  }
}
