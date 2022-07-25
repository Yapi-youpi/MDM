import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Device } from "../../../../../../shared/types/devices";
import { EditDeviceService } from "../../../../../../shared/services/forms/device/edit-device.service";
import { App } from "../../../../../../shared/types/apps";

@Component({
  selector: 'app-app-action-btn',
  templateUrl: './app-action-btn.component.html',
  styleUrls: ['./app-action-btn.component.scss']
})
export class AppActionBtnComponent {
  @Input() target: string = "";
  @Input() app!: App;

  @Output() onClick = new EventEmitter<App>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(device: App) {
    this.onClick.emit(device);

    // this.form.form.setValue({
    //   name: device.name,
    //   description: device.description,
    //   device_group_id: device.device_group_id,
    // });

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle("hidden");
  }
}
