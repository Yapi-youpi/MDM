import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { assetService } from './index';
import { IGroupPermissions, IUser } from '../types/users';
import { usersPaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // public token = '';
  // public login = '';
  public upperCase = false;
  public lowerCase = false;
  public number = false;
  public specialChar = false;
  public passLength = 0;

  constructor(private http: HttpClient, private asset: assetService) {
    // this.asset.getFromStorage('token').then((token: string) => {
    //   this.token = token;
    // });
    // this.asset.getFromStorage('login').then((login: string) => {
    //   this.login = login;
    // });
  }

  changeMyPassword(login: string, last_password: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.url + api.CHANGE_MY_PASS, {
          login: login,
          password: password,
          lastPassword: last_password,
        })
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
    this.lowerCase = false;
    this.upperCase = false;
    this.number = false;
    this.specialChar = false;
    this.passLength = 0;

    return new Promise((resolve, reject) => {
      this.http
        .post(environment.url + api.CHANGE_PASS, {
          login: login,
          password: password.trim(),
        })
        .subscribe({
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
              err.error.error.includes(
                'at least one numeric character required'
              )
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

  delete(id: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post((environment.url = api.DELETE), {
          id: id,
        })
        .subscribe({
          next: (res: { success: boolean; error: string } | any) => {
            resolve(res.success);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  get(id: string | undefined, param: string) {
    id = id ? '/' + id : '';
    if (!param) {
      param = id;
    }
    // const url = environment.url + `/get_user/${param}${id}`;
    return new Promise<IUser[]>((resolve, reject) => {
      this.http.get(environment.url + api.GET + param + id).subscribe({
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

  add(
    avatar: string,
    login: string,
    password: string,
    name: string,
    role: string,
    userTags: string[]
  ) {
    // const url = environment.url + '/register';
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.url + api.SIGN_UP, {
          login: login,
          password: password,
          role: role,
          name: name,
          avatar: avatar,
          userTags: userTags,
        })
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

  rename(login: string, name: string) {
    // const url = environment.url + '/rename_user';
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.RENAME, {
          login: login,
          name: name,
        })
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

  uploadAvatar(id: string, avatar: string) {
    // const url = environment.url + '/load_avatar';
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.LOAD_AVATAR, {
          id: id,
          avatar: avatar,
        })
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

  changeTag(id: string, userTags: string[]) {
    // const url = environment.url + '/edit_user_tag';
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.EDIT_TAG, {
          id: id,
          userTags: userTags,
        })
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

  deleteTag(userTags: string) {
    // const url = environment.url + '/delete_tag';
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.DELETE_TAG, {
          userTags: userTags,
        })
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

  getTags() {
    // const url = environment.url + '/get_user_tags';
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.url + api.GET_TAGS).subscribe({
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
    // const url = environment.url + '/super/get_all_permissions';
    return new Promise<IGroupPermissions[]>((resolve, reject) => {
      this.http.get(environment.url + api.GET_PERMISSIONS).subscribe({
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
    // const url = environment.url + '/super/edit_permissions';
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.EDIT_PERMISSIONS, body).subscribe({
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
