import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EditSeveralDevicesService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      device_group_id: new FormControl("", Validators.required),
      active_state: new FormControl(false, Validators.required),
    });
  }

  get _group() {
    return this.form.getRawValue()["device_group_id"];
  }

  get _state() {
    return this.form.getRawValue()["active_state"];
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }

  resetForm() {
    this.form.reset();

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.setErrors(null);
    });
  }
}
