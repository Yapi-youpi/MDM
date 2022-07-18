import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Device } from "../../../../../shared/types/devices";

@Component({
  selector: "app-device-action-btn",
  templateUrl: "./device-action-btn.component.html",
  styleUrls: ["./device-action-btn.component.scss"],
})
export class DeviceActionBtnComponent {
  @Input() target: string = "";
  @Input() device!: Device;

  @Output() onClick = new EventEmitter<Device>();

  constructor() {}

  onClickHandler(device: Device) {
    this.onClick.emit(device);

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle("hidden");
  }
}
