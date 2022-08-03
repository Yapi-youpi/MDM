import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AddAppService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      // name: new FormControl("", [
      //   Validators.required,
      //   Validators.maxLength(20),
      // ]),
      file: new FormControl(null, Validators.required),
      // runAfterInstall: new FormControl(false),
      // runAtBoot: new FormControl(false),
      // showIcon: new FormControl(false),
    });
  }

  get _file() {
    return this.form.getRawValue()["file"];
  }

  // get _name() {
  //   return this.form.getRawValue()['name'];
  // }

  // get _runAfterInstall() {
  //   return this.form.getRawValue()['runAfterInstall'];
  // }

  // get _runAtBoot() {
  //   return this.form.getRawValue()['runAtBoot'];
  // }

  // get _showIcon() {
  //   return this.form.getRawValue()['showIcon'];
  // }

  setFormSubmitted() {
    this.isSubmitted = true;
  }

  resetFormSubmitted() {
    this.isSubmitted = false;
  }

  resetForm() {
    this.form.reset();
    this.resetFormSubmitted();
  }
}
