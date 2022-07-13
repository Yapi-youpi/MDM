import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EditSeveralDevicesService {
  public form: FormGroup;
  public isSubmitted: boolean = false;

  constructor() {
    this.form = new FormGroup({
      device_group_id: new FormControl("", Validators.required),
      active_state: new FormControl(false, Validators.required),
    });
  }

  setSubmitted() {
    this.isSubmitted = true;
  }

  resetSubmitted() {
    this.isSubmitted = false;
  }
}
