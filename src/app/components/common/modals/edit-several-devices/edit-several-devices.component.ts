import { Component, EventEmitter, Input, Output } from "@angular/core";

import { DevicesGroups } from "../../../../shared/types/groups";

import { EditSeveralDevicesService } from "../../../../shared/services/forms/device/edit-several-devices.service";
import { Option } from "../../../../shared/types/input";

@Component({
  selector: "app-edit-several-devices",
  templateUrl: "./edit-several-devices.component.html",
  styleUrls: ["./edit-several-devices.component.scss"],
})
export class EditSeveralDevicesComponent {
  @Input() groups!: DevicesGroups[];

  @Output() onSubmit = new EventEmitter();

  constructor(public form: EditSeveralDevicesService) {}

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _group_id() {
    return this._form.get("device_group_id");
  }

  get _state() {
    return this._form.get("active_state");
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
    const modal = document.querySelector("#edit_several_devices");
    modal?.classList.toggle("hidden");
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();

      this.closeModal();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this.closeModal();
  }
}
