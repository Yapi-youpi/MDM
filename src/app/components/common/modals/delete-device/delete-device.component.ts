import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Device } from "../../../../shared/types/devices";

@Component({
  selector: "app-delete-device",
  templateUrl: "./delete-device.component.html",
  styleUrls: ["./delete-device.component.css"],
})
export class DeleteDeviceComponent {
  @Input() public device!: Device;

  @Output() onSubmit = new EventEmitter<Device>();

  constructor() {}

  onSubmitHandler(device: Device) {
    this.onSubmit.emit(device);
  }
}
