import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token: string = '';
  public login: string = '';
  public last_password: string = '';

  constructor(private http: HttpClient) {}

  changePassword(password: string) {
    const url = `${environment.url}/change_password`;
    const body = {
      login: this.login,
      password: password,
      lastPassword: this.last_password,
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(url, body
        )
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  changeUserPassword(login: string, password: string) {
    const url = `${environment.url}/change_user_password`;
    const body = {
      login: login,
      password: password,
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(url, body)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  changeUserState(id: string, state: boolean) {
    const url = `${environment.url}/change_user_state`;
    const body = {
      id: id,
      activeState: state,
    };
    return new Promise<boolean>((resolve, reject) => {
      // @ts-ignore
      this.http
        .post(url, body)
        .subscribe({
          next: (res: { success: boolean; error: string }) => {
            resolve(res.success);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  deleteUser(id: string) {
    const url = `${environment.url}/delete_user`;
    const body = {
      id,
    };
    return new Promise<boolean>((resolve, reject) => {
      // @ts-ignore
      this.http
        .post(url, body)
        .subscribe({
          next: (res: { success: boolean; error: string }) => {
            resolve(res.success);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  getUserInfo(id: string | undefined, param: string) {
    if (!id) {
      id = '';
    }
    if (!param) {
      param = id;
    }
    const url = `${environment.url}/get_user/${param}`;
    return new Promise<Users[]>((resolve, reject) => {
      // @ts-ignore
      this.http
        .get(url)
        .subscribe({
          next: (res: { users: Users[]; success: boolean; error: string }) => {
            resolve(res.users);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  addUser(login: string, password: string, name: string, role: string) {
    const url = `${environment.url}/register`;
    const body = {
      login,
      password,
      role,
      name,
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(url, body)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
