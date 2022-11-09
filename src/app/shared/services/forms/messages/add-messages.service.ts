import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddMessagesService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      dst: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  reset() {
    this.form.reset();
  }
}
