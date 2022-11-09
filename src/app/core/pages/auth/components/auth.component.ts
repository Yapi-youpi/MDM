import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormService } from '../services/form.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../../shared/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(
    private _form: FormService,
    private _router: Router,
    private _user: UserModel
  ) {}

  get form() {
    return this._form.form;
  }

  get isSubmitted() {
    return this._form.isSubmitted;
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  get isRememberMe() {
    return this.form.get('isRememberMe');
  }

  onFormSubmitHandler() {
    this._form.isSubmitted = true;

    if (this.form.invalid) return;
    else {
      const login = (this.login?.value as string) || '';
      const password = (this.password?.value as string) || '';
      const isRememberMe = (this.isRememberMe?.value as boolean) || false;

      this._user.signIn(login, password, isRememberMe).then((res) => {
        if (res) {
          this._form.isSubmitted = false;
          this._form.reset();
          this._router.navigate(['/devices']).then();
        }
      });
    }
  }
}
