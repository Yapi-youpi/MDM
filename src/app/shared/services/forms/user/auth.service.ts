import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
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
