import { Component, EventEmitter, Output } from "@angular/core";
import { form, user } from "src/app/shared/services";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent {
  @Output() onSubmit = new EventEmitter();

  constructor(
    public changeForm: form.user.changePass,
    public userService: user
  ) {}

  get _form() {
    return this.changeForm.form;
  }

  get _pass() {
    return this.changeForm.form.get("password");
  }

  get _confPass() {
    return this.changeForm.form.get("confirmPassword");
  }

  onSubmitHandler() {
    this.changeForm.setSubmitted();

    if (this.changeForm.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }
}
