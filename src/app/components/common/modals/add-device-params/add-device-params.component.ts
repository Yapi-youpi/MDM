import { Component, EventEmitter, Output } from "@angular/core";
import { AddDeviceService } from "../../../../shared/services/forms/device/add-device.service";

@Component({
  selector: "app-add-device-params",
  templateUrl: "./add-device-params.component.html",
  styleUrls: ["./add-device-params.component.css"],
})
export class AddDeviceParamsComponent {
  @Output() onSubmit = new EventEmitter();

  public isTipHidden: boolean = true;

  constructor(public form: AddDeviceService) {}

  get _title() {
    return this.form.secondFormTitle;
  }

  get _form() {
    return this.form.secondForm;
  }

  get _isSubmitted() {
    return this.form.isSecondFormSubmitted;
  }

  get _phone() {
    return this.form.secondForm.get("phone_number");
  }

  get _model() {
    return this.form.secondForm.get("model");
  }

  get _imei() {
    return this.form.secondForm.get("imei");
  }

  onSubmitHandler() {
    this.form.setSecondFormSubmitted();

    if (this.form.secondForm.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSecondFormSubmitted();
    this.form.resetSecondForm();
  }

  toggleTip() {
    this.isTipHidden = !this.isTipHidden;
  }
}
