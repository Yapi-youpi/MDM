import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EditSeveralGroupsService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      deviceConfigID: new FormControl("", Validators.required),
      activeState: new FormControl(false, Validators.required),
    });
  }

  get _config() {
    return this.form.getRawValue()["deviceConfigID"];
  }

  get _state() {
    return this.form.getRawValue()["activeState"];
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
