import { Component, EventEmitter, Input, Output } from "@angular/core";

import { DevicesConfig } from "../../../interfaces/config";
import { DevicesGroups } from "../../../interfaces/groups";
import { Device } from "../../../interfaces/devices";

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
  @Output() onClickDeviceQRCode = new EventEmitter<{
    name: string;
    qrcode: any;
  }>();
  @Output() onClickDeviceEdit = new EventEmitter<Device>();
  @Output() onClickDeviceDelete = new EventEmitter<Device>();

  constructor() {}

  onSelectUnselectDeviceHandler(device: Device) {
    this.onSelectUnselectDevice.emit(device);
  }

  onChangeDeviceStateHandler(device: Device) {
    this.onChangeDeviceState.emit(device);
  }

  onClickDeviceQRCodeHandler(name: string, qrcode: any) {
    this.onClickDeviceQRCode.emit({ name, qrcode });
  }

  onClickDeviceEditHandler(device: Device) {
    this.onClickDeviceEdit.emit(device);
  }

  onClickDeviceDeleteHandler(device: Device) {
    this.onClickDeviceDelete.emit(device);
  }
}
