import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { assetService } from './index';
import { IGroupPermissions, IUser } from '../types/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token = '';
  public login = '';
  public upperCase = false;
  public lowerCase = false;
  public number = false;
  public specialChar = false;
  public passLength = 0;
  constructor(private http: HttpClient, private asset: assetService) {
    this.asset.getFromStorage('token').then((token: string) => {
      this.token = token;
    });
    this.asset.getFromStorage('login').then((login: string) => {
      this.login = login;
    });
  }

  changePassword(last_password: string, password: string) {
    const url = environment.url + '/change_password';
    const body = {
      login: this.login,
      password: password,
      lastPassword: last_password,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body).subscribe({
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
    this.lowerCase = false;
    this.upperCase = false;
    this.number = false;
    this.specialChar = false;
    this.passLength = 0;
    const url = `${environment.url}/change_user_password`;
    const body = {
      login: login,
      password: password.trim(),
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          if (err.error.error.includes('lowercase letter missing')) {
            this.lowerCase = true;
          }
          if (err.error.error.includes('uppercase letter missing')) {
            this.upperCase = true;
          }
          if (
            err.error.error.includes('at least one numeric character required')
          ) {
            this.number = true;
          }
          if (err.error.error.includes('special character missing')) {
            this.specialChar = true;
          }
          if (
            err.error.error.includes(
              'password length must be between 8 to 64 character'
            )
          ) {
            this.passLength = 8 - password.length;
          }
          reject(err);
        },
      });
    });
  }

  deleteUser(id: string) {
    const url = environment.url + '/delete_user';
    const body = {
      id,
    };
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res: { success: boolean; error: string } | any) => {
          resolve(res.success);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  getUserInfo(id: string | undefined, param: string) {
    id = id ? '/' + id : '';
    if (!param) {
      param = id;
    }
    const url = environment.url + `/get_user/${param}${id}`;
    return new Promise<IUser[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (
          res: { users: IUser[]; success: boolean; error: string } | any
        ) => {
          resolve(res.users);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  addUser(
    avatar: string,
    login: string,
    password: string,
    name: string,
    role: string,
    userTags: string[]
  ) {
    const url = environment.url + '/register';
    const body = {
      login,
      password,
      role,
      name,
      avatar,
      userTags,
    };
    return new Promise((resolve, reject) => {
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

  renameUSer(login: string, name: string) {
    const url = environment.url + '/rename_user';
    const body = {
      login,
      name,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  loadAvatar(id: string, avatar: string) {
    const url = environment.url + '/load_avatar';
    const body = {
      id,
      avatar,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  changeUserTag(id: string, userTags: string[]) {
    const url = environment.url + '/edit_user_tag';
    const body = {
      id,
      userTags,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  deleteUserTag(userTags: string) {
    const url = environment.url + '/delete_tag';
    const body = {
      userTags,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getUserTags() {
    const url = environment.url + '/get_user_tags';
    return new Promise<any>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getPermissions() {
    const url = environment.url + '/super/get_all_permissions';
    return new Promise<IGroupPermissions[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (
          res:
            | {
                permissions: IGroupPermissions[];
                success: boolean;
                error: string;
              }
            | any
        ) => {
          resolve(res.permissions);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  changePermissions(body: object) {
    const url = environment.url + '/super/edit_permissions';
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
