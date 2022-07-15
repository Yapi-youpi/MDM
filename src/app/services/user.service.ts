import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GroupPermissions, Users } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token = '';
  public login = '';
  public last_password = '';
  public upperCase = false;
  public lowerCase = false;
  public number = false;
  public specialChar = false;
  public passLength = 0;
  constructor(private http: HttpClient) {}

  changePassword(password: string) {
    const url = environment.url + '/change_password';
    const body = {
      login: this.login,
      password: password,
      lastPassword: this.last_password,
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
  changeUserState(id: string, state: boolean) {
    const url = environment.url + '/change_user_state';
    const body = {
      id: id,
      activeState: state,
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
    if (!id) {
      id = '';
    }
    if (!param) {
      param = id;
    }
    const url = environment.url + `/get_user/${param}`;
    return new Promise<Users[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (
          res: { users: Users[]; success: boolean; error: string } | any
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

  getPermissions() {
    const url = environment.url + '/super/get_all_permissions';
    return new Promise<GroupPermissions[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (
          res:
            | {
                permissions: GroupPermissions[];
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
