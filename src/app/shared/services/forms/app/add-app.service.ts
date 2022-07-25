import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AddAppService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      file: new FormControl(null, Validators.required),
    })
  }

  get _file() {
    return this.form.getRawValue()['file']
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