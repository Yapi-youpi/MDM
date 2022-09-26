import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  assetService,
  authService,
  databaseService,
  formService,
  userService,
} from '../../../shared/services';

import { IUserState } from '../../../shared/types/states';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private auth: authService,
    private router: Router,
    public user: userService,
    public asset: assetService,
    private db: databaseService,
    public logForm: formService.user.auth
  ) {}

  get _form() {
    return this.logForm.form;
  }

  get _isSubmitted() {
    return this.logForm.isSubmitted;
  }

  get _login() {
    return this._form.get('login');
  }

  get _pass() {
    return this._form.get('password');
  }

  login() {
    this.logForm.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      this.auth
        .login(this.logForm._login, this.logForm._pass)
        .then((res: IUserState) => {
          this.asset.setToStorage('token', res.token).then();
          this.asset.setToStorage('id', res.id).then();
          this.asset.setToStorage('login', this.logForm._login).then();
          this.asset.setToStorage('last_password', this.logForm._pass).then();

          this.user.token = res.token;
          this.user.login = this.logForm._login;

          this.router.navigateByUrl('devices').then(() => {
            if (res.error === 'change super admin password') {
              // !!! СМЕНИТЬ ПАРОЛЬ СУПЕРПОЛЬЗОВАТЕЛЮ !!!
            }
          });

          this.db
            .signup(this.user.login, this.logForm._pass)
            .then((res) => {
              console.log(res, 'Log In res');
              this.logForm.resetForm();
              this.logForm.resetSubmitted();
            })
            .catch((err) => {
              if (err === 400) {
                this.db
                  .logIN(this.logForm._login, this.logForm._pass)
                  .then((res) => {
                    console.log(res, 'Log In res');
                  })
                  .catch((err) => {
                    console.log(err, 'Log In err');
                  });
              }
            });
        })
        .catch((err) => {
          console.log(err);
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
