import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EditDeviceService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      device_config_id: new FormControl("", Validators.required),
      device_group_id: new FormControl("", Validators.required),
    });
  }

  get _name() {
    return this.form.getRawValue()["name"];
  }

  get _description() {
    return this.form.getRawValue()["description"];
  }

  get _config_id() {
    return this.form.getRawValue()["device_config_id"];
  }

  get _group_id() {
    return this.form.getRawValue()["device_group_id"];
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }
}
