import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AddDeviceService {
  public firstForm: FormGroup;
  public secondForm: FormGroup;

  public isFirstFormSubmitted: boolean = false;
  public isSecondFormSubmitted: boolean = false;

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

    this.secondForm = new FormGroup({
      phone_number: new FormControl("", Validators.required),
      model: new FormControl("", Validators.required),
      imei: new FormControl("", Validators.required),
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

  get _phone() {
    return this.secondForm.getRawValue()["phone_number"];
  }

  get _model() {
    return this.secondForm.getRawValue()["model"];
  }

  get _imei() {
    return this.secondForm.getRawValue()["imei"];
  }

  setFirstFormSubmitted() {
    this.isFirstFormSubmitted = true;
  }

  setSecondFormSubmitted() {
    this.isSecondFormSubmitted = true;
  }

  resetFirstFormSubmitted() {
    this.isFirstFormSubmitted = false;
  }

  resetSecondFormSubmitted() {
    this.isSecondFormSubmitted = false;
  }

  resetFirstForm() {
    this.firstForm.reset();
  }

  resetSecondForm() {
    this.secondForm.reset();
  }
}
