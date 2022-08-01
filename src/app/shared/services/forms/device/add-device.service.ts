import { ElementRef, Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AddDeviceService {
  public form: FormGroup;

  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      device_group_id: new FormControl("", Validators.required),
    });
  }

  get _name() {
    return this.form.getRawValue()["name"];
  }

  get _desc() {
    return this.form.getRawValue()["description"];
  }

  get _group() {
    return this.form.getRawValue()["device_group_id"];
  }

  setFormSubmitted() {
    this.isSubmitted = true;
  }

  resetFormSubmitted() {
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
