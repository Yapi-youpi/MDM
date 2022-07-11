import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Device } from "../../../../interfaces/devices";

@Component({
  selector: "app-delete-device",
  templateUrl: "./delete-device.component.html",
  styleUrls: ["./delete-device.component.css"],
})
export class DeleteDeviceComponent {
  @Input() public device!: Device;

  @Output() onDeleteDevice = new EventEmitter<Device>();

  constructor() {}

  onDeleteDeviceHandler(device: Device) {
    this.onDeleteDevice.emit(device);
  }
}
