import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { authService } from '../../../shared/services';
import { auth } from '../../../shared/services/forms/user';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private auth: authService,
    private router: Router,
    public form: auth,
    private myUser: MyUserClass
  ) {}

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _login() {
    return this._form.get('login');
  }

  get _pass() {
    return this._form.get('password');
  }

  login() {
    this.form.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      if (this._form.value)
        this.myUser
          .signIn(
            this._form.value.login.trim(),
            this._form.value.password.trim()
          )
          .then((res) => {
            if (res) {
              this.form.resetForm();
              this.form.resetSubmitted();
            }
          });

      // forbidden for not super users :((
      // I wanted to get permissions and set them automatically on components and interactive elements
      /*      this.user
        .getPermissions()
        .then((res) => {
          for (let key in res) {
            this.asset.setToStorage(key, String(res[key])).then();
          }
        })
        .catch((err) => console.log(err));*/
    }
  }
}
