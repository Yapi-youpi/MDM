import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DevicesConfig } from "../../../../../shared/types/config";
import { editSeveral } from "../../../../../shared/services/forms/group";
import { Option } from "../../../../../shared/types/input";

@Component({
  selector: "app-edit-several-groups",
  templateUrl: "./edit-several-groups.component.html",
  styleUrls: ["./edit-several-groups.component.scss"],
})
export class EditSeveralGroupsComponent {
  @Input() configs!: DevicesConfig[];

  @Output() onSubmit = new EventEmitter();

  public currOption: Option = { value: "", html: "" };

  constructor(private form: editSeveral) {}

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _config() {
    return this._form.get("deviceConfigID");
  }

  get _state() {
    return this._form.get("activeState");
  }

  get _options() {
    return this.configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this._config?.value,
      html: this.configs.find((c) => c.ID === this._config?.value)?.name,
    } as Option;
  }

  onSelectHandler(item: Option) {
    this._form.patchValue({
      deviceConfigID: item.value,
    });

    this.currOption = item;
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this._form.patchValue({
      deviceConfigID: "",
    });
    this.currOption = { value: "", html: "" };

    const modal = document.querySelector("#edit_several_groups");
    modal?.classList.toggle("hidden");
  }
}
