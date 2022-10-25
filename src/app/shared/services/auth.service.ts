import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { authPaths as api } from '../enums/api';
import { IState, IUserState } from '../types/states';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private alert: alertService) {}

  signIn(login: string, password: string) {
    return new Promise<{ id: string; token: string } | null>((resolve) => {
      this.http
        .post<IUserState>(environment.url + api.SING_IN, {
          login: login,
          password: password,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve({ id: res.id, token: res.token });
            else {
              this.alert.show({
                title: 'Ошибка авторизации',
                content: res.error,
              });
              resolve(null);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(null);
          },
        });
    });
  }

  signOut(token: string, login: string) {
    const body = {};
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.SING_OUT, body, {
          headers: {
            MDMToken: token,
            MDMLogin: login,
          },
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка выхода из системы',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(false);
          },
        });
    });
  }
}
