import { Injectable } from '@angular/core';
import {
  assetService,
  authService,
  databaseService,
  userService,
} from '../../services';
import { UsersLoaderClass } from './users-loader.class';
import { IUser } from '../../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyUserClass {
  public login: string = '';
  public token: string = '';
  public role: string = '';

  public me!: IUser;

  constructor(
    private asset: assetService,
    private loader: UsersLoaderClass,
    private service: userService,
    private auth: authService,
    private db: databaseService,
    private router: Router
  ) {
    this.asset.getFromStorage('token').then((token: string) => {
      this.token = token;
    });
    this.asset.getFromStorage('login').then((login: string) => {
      this.login = login;
    });
  }

  isAuth() {
    return new Promise<boolean>((resolve) => {
      this.asset.getFromStorage('token').then((res) => {
        if (res && res !== '') resolve(true);
        else resolve(false);
      });
    });
  }

  getMe() {
    return new Promise<boolean>((resolve) => {
      this.asset.getFromStorage('id').then((id: string) => {
        this.loader.start();

        this.service
          .get(id, 'uid')
          .then((res) => {
            if (res) {
              this.me = res[0];
              this.asset.setToStorage('user-role', res[0].role).then();
              this.role = res[0].role;
              resolve(true);
            } else {
              this.asset.setToStorage('user-role', '').then();
              this.role = '';
              resolve(false);
            }
          })
          .finally(() => this.loader.end());
      });
    });
  }

  signIn(login: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.auth
        .signIn(login, password)
        .then((res) => {
          if (res) {
            this.asset.setToStorage('token', res.token).then();
            this.asset.setToStorage('id', res.id).then();
            this.asset.setToStorage('login', login).then();
            this.asset.setToStorage('last_password', password).then();

            this.token = res.token;
            this.login = login;

            this.router.navigateByUrl('devices').then(() => {
              //   // if (res.error === 'change super admin password') {
              //   //   // !!! СМЕНИТЬ ПАРОЛЬ СУПЕРПОЛЬЗОВАТЕЛЮ !!!
              //   // }
            });

            this.db
              .signUp(login, password)
              .then((res) => {
                console.log(res, 'Log In res');
                resolve(true);
              })
              .catch((err) => {
                if (err === 400) {
                  this.db
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
        })
        .finally(() => this.loader.end());
    });
  }

  signOut() {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.auth
        .signOut(this.token, this.login)
        .then((res) => {
          if (res) {
            this.token = '';
            this.asset.removeFromStorage('id').then();
            this.asset.removeFromStorage('token').then();
            this.asset.removeFromStorage('name').then();
            this.asset.removeFromStorage('login').then();
            this.asset.removeFromStorage('last_password').then();
            this.asset.removeFromStorage('user-role').then();
            localStorage.clear();
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  changePassword(login: string, last_password: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .changeMyPassword(login, last_password, password)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }
}
