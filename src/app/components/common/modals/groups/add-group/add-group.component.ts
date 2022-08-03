import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DevicesConfig } from "../../../../../shared/types/config";
import { Option } from "../../../../../shared/types/input";
import { add } from "../../../../../shared/services/forms/group";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent {
  @Input() configs: DevicesConfig[] = [];

  @Output() public onSubmit = new EventEmitter();

  public currOption: Option = { value: "", html: "" };

  constructor(private form: add) {}

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

  get _config_id() {
    return this._form.get("deviceConfigID");
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
      value: this._config_id?.value,
      html: this.configs.find((c) => c.ID === this._config_id?.value)?.name,
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
      this.currOption = { value: "", html: "" };
    }
  }
  onCancelHandler() {
    this.form.reset();

    this._form.patchValue({
      deviceConfigID: "",
    });
    this.currOption = { value: "", html: "" };

    const modal = document.querySelector("#add_group");
    modal?.classList.toggle("hidden");
  }
}
