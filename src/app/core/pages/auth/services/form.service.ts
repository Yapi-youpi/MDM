import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormService {
  private readonly _form: FormGroup;
  private _isSubmitted: boolean = false;

  constructor() {
    this._form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      isRememberMe: new FormControl(false),
    });
  }

  get form() {
    return this._form;
  }

  get isSubmitted() {
    return this._isSubmitted;
  }

  set isSubmitted(value) {
    this._isSubmitted = value;
  }

  reset() {
    this._form.reset({
      login: '',
      password: '',
      isRememberMe: false,
    });
  }
}
