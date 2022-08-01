import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EditGroupService {
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
      deviceConfigID: new FormControl("", Validators.required),
    });
  }

  get _name() {
    return this.form.getRawValue()["name"];
  }

  get _description() {
    return this.form.getRawValue()["description"];
  }

  get _deviceConfigID() {
    return this.form.getRawValue()["deviceConfigID"];
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }
}
