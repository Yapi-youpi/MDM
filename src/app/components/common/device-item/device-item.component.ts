import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Device } from "../../../interfaces/interfaces";

@Component({
  selector: "app-device-item",
  templateUrl: "./device-item.component.html",
  styleUrls: ["./device-item.component.css"],
})
export class DeviceItemComponent {
  @Input() public device!: Device;

  @Output() onSelectUnselectDevice = new EventEmitter<Device>();
  @Output() onChangeDeviceConfig = new EventEmitter<{
    device: Device;
    $event: Event;
  }>();
  @Output() onGetDeviceQRCode = new EventEmitter<{
    name: string;
    qrcode: any;
  }>();
  @Output() onEditDevice = new EventEmitter<Device>();
  @Output() onDeleteDevice = new EventEmitter<string>();

  constructor() {}

  selectUnselectDevice(device: Device) {
    this.onSelectUnselectDevice.emit(device);
  }

  changeDeviceConfig(device: Device, $event) {
    this.onChangeDeviceConfig.emit({ device, $event });
  }

  getDeviceQRCode(name: string, qrcode: any) {
    this.onGetDeviceQRCode.emit({ name, qrcode });
  }

  editDevice(device: Device) {
    this.onEditDevice.emit(device);
  }

  deleteDevice(id: string) {
    this.onDeleteDevice.emit(id);
  }
}
