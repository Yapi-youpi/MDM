import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  public form: FormGroup;

  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  get _pass() {
    return this.form.getRawValue()['password'];
  }

  get _passConf() {
    return this.form.getRawValue()['confirmPassword'];
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetForm() {
    this.form.reset();

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.setErrors(null);
    });
  }
}
