import { Component, EventEmitter, Output } from '@angular/core';
import { formService, userService } from 'src/app/hide/shared/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  @Output() onSubmit = new EventEmitter();

  constructor(
    public changeForm: formService.user.changePass,
    public user: userService
  ) {}

  get _form() {
    return this.changeForm.form;
  }

  get _pass() {
    return this.changeForm.form.get('password');
  }

  get _confPass() {
    return this.changeForm.form.get('confirmPassword');
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
