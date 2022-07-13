import { Component, EventEmitter, Input, Output } from "@angular/core";

import { DevicesConfig } from "../../../shared/interfaces/config";
import { DevicesGroups } from "../../../shared/interfaces/groups";
import { Device } from "../../../shared/interfaces/devices";

@Component({
  selector: "app-device-item",
  templateUrl: "./device-item.component.html",
  styleUrls: ["./device-item.component.css"],
})
export class DeviceItemComponent {
  @Input() public device!: Device;
  @Input() public configs!: DevicesConfig[];
  @Input() public groups!: DevicesGroups[];

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
