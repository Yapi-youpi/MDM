import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddConfigService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prototype: new FormControl(''),
    });
    this.form.controls['prototype'].setValue('Стандартная конфигурация', {
      onlySelf: true,
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  reset() {
    this.form.reset();
  }
}
