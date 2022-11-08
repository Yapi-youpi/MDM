import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      oldPassword: new FormControl(''),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      userTags: new FormControl(''),
      other: new FormControl(''),
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  reset() {
    this.form.reset();
  }
}
