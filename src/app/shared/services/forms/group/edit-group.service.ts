import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EditGroupService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      deviceConfigID: new FormControl('', Validators.required),
      iconID: new FormControl(
        '/assets/group-icons/rhombus.png',
        Validators.required
      ),
    });
  }

  get values() {
    return this.form.getRawValue();
  }

  get _name() {
    return this.form.getRawValue()['name'];
  }

  get _description() {
    return this.form.getRawValue()['description'];
  }

  get _deviceConfigID() {
    return this.form.getRawValue()['deviceConfigID'];
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }

  async setIconBase64FromURL(url) {
    const data = await fetch(url);
    const blob = await data.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.form.get('iconID')?.setValue(base64data);
    };
  }
}
