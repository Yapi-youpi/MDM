import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../core/common/alert/alert.service';
import { environment } from '../../../environments/environment';
import { EAuth } from '../enums';
import { IAuthState } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  signIn(login: string, password: string) {
    return new Promise<{ id: string; token: string } | null>((resolve) => {
      this._http
        .post<IAuthState>(environment.url + EAuth.SING_IN, {
          login: login,
          password: password,
        })
        .subscribe({
          next: (res) => {
            // todo: может вернуть error super password
            if (res.success) resolve({ id: res.id, token: res.token });
            else {
              this._alert.show({
                title: 'Ошибка авторизации',
                message: res.error,
              });
              resolve(null);
            }
          },
          error: (err: HttpErrorResponse) => {
            this._alert.show({
              title: 'Ошибка авторизации',
              message: err.error,
            });
            resolve(null);
          },
        });
    });
  }
}
