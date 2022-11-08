import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EditAppService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      showIcon: new FormControl(false),
      useKiosk: new FormControl(false),
      system: new FormControl(false),
      runAfterInstall: new FormControl(false),
      runAtBoot: new FormControl(false),
      skipVersion: new FormControl(false),
      screenOrder: new FormControl(0),
      bottom: new FormControl(false),
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }

  resetForm() {
    this.form.reset();
  }
}
