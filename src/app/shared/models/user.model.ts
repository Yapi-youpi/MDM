import { Injectable } from '@angular/core';
import { ParseService, StorageService, UserService } from '../services';
import { LoaderModel } from './loader.model';

@Injectable()
export class UserModel {
  private _login: string = '';
  private _token: string = '';

  constructor(
    private _loader: LoaderModel,
    private _service: UserService,
    private _storage: StorageService,
    private _parse: ParseService
  ) {}

  get login() {
    return this._login;
  }

  get token() {
    return this._token;
  }

  isAuth() {
    return new Promise<boolean>((resolve) => {
      this._storage.get('token').then((res) => {
        if (res && res !== '') resolve(true);
        else resolve(false);
      });
    });
  }

  signIn(login: string, password: string, isRememberMe: boolean) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('user');
      this._service.signIn(login, password).then((res) => {
        if (res) {
          this._storage.set('id', res.id).then();
          this._storage.set('token', res.token).then();
          this._storage.set('login', login).then();
          this._storage.set('last_password', password).then();

          this._login = login;
          this._token = res.token;

          this._parse.signIn(login, password).then((res) => resolve(res));
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }
}
