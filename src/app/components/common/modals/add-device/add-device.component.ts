import { Component, EventEmitter, Input, Output } from "@angular/core";

import { DevicesGroup } from "../../../../shared/types/groups";
import { AddDeviceService } from "../../../../shared/services/forms/device/add-device.service";
import { Option } from "../../../../shared/types/input";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.scss"],
})
export class AddDeviceComponent {
  @Input() public groups!: DevicesGroup[];

  @Output() public onSubmit = new EventEmitter();

  constructor(public form: AddDeviceService) {}

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
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

  get _options() {
    return this.groups.map((g) => {
      return {
        value: g.id,
        html: g.name,
      } as Option;
    });
  }

  closeModal() {
    const modal = document.querySelector("#add_device");
    modal?.classList.toggle("hidden");
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();

      this.closeModal();
    }
  }
  onCancelHandler() {
    this.form.resetFormSubmitted();
    this.form.resetForm();

    this.closeModal();
  }
}
