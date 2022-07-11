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
  @Output() onGetDeviceQRCode = new EventEmitter<{
    name: string;
    qrcode: any;
  }>();
  @Output() onEditDevice = new EventEmitter<Device>();
  @Output() onDeleteDevice = new EventEmitter<Device>();

  constructor() {}

  selectUnselectDevice(device: Device) {
    this.onSelectUnselectDevice.emit(device);
  }

  getDeviceQRCode(name: string, qrcode: any) {
    this.onGetDeviceQRCode.emit({ name, qrcode });
  }

  editDevice(device: Device) {
    this.onEditDevice.emit(device);
  }

  deleteDevice(device: Device) {
    this.onDeleteDevice.emit(device);
  }
}
