import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AddDeviceService {
  public firstForm: FormGroup;
  public isFirstFormSubmitted: boolean = false;

  public secondFormTitle: string = "";

  constructor() {
    this.firstForm = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      device_group_id: new FormControl("", Validators.required),
    });
  }

  get _name() {
    return this.firstForm.getRawValue()["name"];
  }

  get _desc() {
    return this.firstForm.getRawValue()["description"];
  }

  get _group() {
    return this.firstForm.getRawValue()["device_group_id"];
  }

  setFirstFormSubmitted() {
    this.isFirstFormSubmitted = true;
  }

  resetFirstFormSubmitted() {
    this.isFirstFormSubmitted = false;
  }

  resetFirstForm() {
    this.firstForm.reset();
  }
}
