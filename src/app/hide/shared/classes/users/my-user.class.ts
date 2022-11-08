import { Injectable } from '@angular/core';
import {
  assetService,
  authService,
  databaseService,
  userService,
} from '../../services';
import { IUser } from '../../types';
import { Router } from '@angular/router';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class MyUserClass {
  public login: string = '';
  public token: string = '';
  public role: string = '';

  public me!: IUser;

  constructor(
    private _asset: assetService,
    private _loader: LoaderClass,
    private _service: userService,
    private _auth: authService,
    private _db: databaseService,
    private _router: Router
  ) {
    this._asset.get('token').then((token: string) => {
      this.token = token;
    });
    this._asset.get('login').then((login: string) => {
      this.login = login;
    });
  }

  isAuth() {
    return new Promise<boolean>((resolve) => {
      this._asset.get('token').then((res) => {
        if (res && res !== '') resolve(true);
        else resolve(false);
      });
    });
  }

  getMe() {
    return new Promise<boolean>((resolve) => {
      this._asset.get('id').then((id: string) => {
        this._loader.start('users');

        this._service.get(id, 'uid').then((res) => {
          if (res) {
            this.me = res[0];
            this._asset.set('user-role', res[0].role).then();
            this.role = res[0].role;
            resolve(true);
          } else {
            this._asset.set('user-role', '').then();
            this.role = '';
            resolve(false);
          }
        });
      });
    }).finally(() => this._loader.end());
  }

  signIn(login: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._auth.signIn(login, password).then((res) => {
        if (res) {
          this._asset.set('token', res.token).then();
          this._asset.set('id', res.id).then();
          this._asset.set('login', login).then();
          this._asset.set('last_password', password).then();

          this.token = res.token;
          this.login = login;

          this._router.navigateByUrl('devices').then(() => {
            //   // if (res.error === 'change super admin password') {
            //   //   // !!! СМЕНИТЬ ПАРОЛЬ СУПЕРПОЛЬЗОВАТЕЛЮ !!!
            //   // }
          });

          this._db
            .signUp(login, password)
            .then((res) => {
              console.log(res, 'Log In res');
              resolve(true);
            })
            .catch((err) => {
              if (err === 400) {
                this._db
                  .logIN(login, password)
                  .then((res) => {
                    console.log(res, 'Log In res');
                    resolve(true);
                  })
                  .catch((err) => {
                    console.log(err, 'Log In err');
                    resolve(false);
                  });
              }
            });
        }
      });
    }).finally(() => this._loader.end());
  }

  signOut() {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._auth.signOut(this.token, this.login).then((res) => {
        if (res) {
          this.token = '';
          this._asset.delete('id').then();
          this._asset.delete('token').then();
          this._asset.delete('name').then();
          this._asset.delete('login').then();
          this._asset.delete('last_password').then();
          this._asset.delete('user-role').then();
          localStorage.clear();
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  changePassword(login: string, last_password: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service
        .changeMyPassword(login, last_password, password)
        .then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }
}
