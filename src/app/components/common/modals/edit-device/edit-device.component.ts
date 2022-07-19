import { Component, Input, Output, EventEmitter } from "@angular/core";

import { EditDeviceService } from "../../../../shared/services/forms/device/edit-device.service";

import { DevicesGroup } from "../../../../shared/types/groups";
import { Option } from "../../../../shared/types/input";

@Component({
  selector: "app-edit-device",
  templateUrl: "./edit-device.component.html",
  styleUrls: ["./edit-device.component.scss"],
})
export class EditDeviceComponent {
  @Input() public groups!: DevicesGroup[];

  @Output() public onSubmit = new EventEmitter();

  constructor(public form: EditDeviceService) {}

  get _form() {
    return this.form.form;
  }

  get _name() {
    return this._form.get("name");
  }

  get _description() {
    return this._form.get("description");
  }

  get _group_id() {
    return this._form.get("device_group_id");
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _options() {
    return this.groups.map((g) => {
      return {
        value: g.id,
        html: g.name,
      } as Option;
    });
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.form.reset();

    const modal = document.querySelector("#edit_device");
    modal?.classList.toggle("hidden");
  }
}
