import { Injectable } from '@angular/core';
import { assetService, authService, userService } from '../../services';
import { UsersLoaderClass } from './users-loader.class';
import { IUser } from '../../types/users';

@Injectable({
  providedIn: 'root',
})
export class MyUserClass {
  public login: string = '';
  public token: string = '';
  // todo: убрать
  public id: string = '';

  public me!: IUser;

  constructor(
    private asset: assetService,
    private loader: UsersLoaderClass,
    private service: userService,
    private auth: authService
  ) {
    this.asset.getFromStorage('token').then((token: string) => {
      this.token = token;
    });
    this.asset.getFromStorage('login').then((login: string) => {
      this.login = login;
    });
  }

  getMe() {
    return new Promise<boolean>(() => {
      this.asset.getFromStorage('id').then((id: string) => {
        this.id = id;
        this.get(id).then();
      });
    });
  }

  get(id: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .get(id, 'uid')
        .then((res) => {
          if (res) {
            this.me = res[0];
            this.asset.setToStorage('user-role', res[0].role).then();
            resolve(true);
          } else {
            this.asset.setToStorage('user-role', '').then();
            resolve(false);
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
}
