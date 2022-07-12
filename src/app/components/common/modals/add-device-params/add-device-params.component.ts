import { Component, Input } from "@angular/core";
import { AddDeviceService } from "../../../../shared/services/forms/device/add-device.service";

@Component({
  selector: "app-add-device-params",
  templateUrl: "./add-device-params.component.html",
  styleUrls: ["./add-device-params.component.css"],
})
export class AddDeviceParamsComponent {
  constructor(public form: AddDeviceService) {}

  get _title() {
    return this.form.secondFormTitle;
  }
}
