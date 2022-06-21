import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  login(login: string, password: string) {
    const url = environment.url + '/login';
    const body = {
      login: login.trim(),
      password: password.trim(),
    };
    console.log(body);
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  logout(token: string, login: string) {
    const url = environment.url + '/logout';
    const body = {};
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post(url, body, {
          headers: {
            MDMToken: token,
            MDMLogin: login,
          },
        })
        .subscribe({
          next: (res: { success: boolean; error: string } | any) => {
            resolve(res.success);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
