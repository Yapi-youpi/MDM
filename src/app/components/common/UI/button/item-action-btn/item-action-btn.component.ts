import { Component, EventEmitter, Input, Output } from "@angular/core";

import { EditDeviceService } from "../../../../../shared/services/forms/device/edit-device.service";

import { Device } from "../../../../../shared/types/devices";

@Component({
  selector: "app-item-action-btn",
  templateUrl: "./item-action-btn.component.html",
  styleUrls: ["./item-action-btn.component.scss"],
})
export class ItemActionBtnComponent {
  @Input() target: string = "";
  @Input() device!: Device;

  @Output() onClick = new EventEmitter<Device>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(device: Device) {
    this.onClick.emit(device);

    this.form.form.setValue({
      name: device.name,
      description: device.description,
      device_group_id: device.device_group_id,
    });
    // console.log(this.form.form.getRawValue());

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle("hidden");
  }
}
