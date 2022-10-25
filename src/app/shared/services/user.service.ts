import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IGroupPermissions, IUser } from '../types/users';
import { usersPaths as api } from '../enums/api';
import {
  IGroupPermissionsState,
  IRegisterState,
  IState,
  IUsersState,
  IUserTagsState,
} from '../types/states';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public upperCase = false;
  public lowerCase = false;
  public number = false;
  public specialChar = false;
  public passLength = 0;

  constructor(private http: HttpClient, private alert: alertService) {}

  changeMyPassword(login: string, last_password: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.CHANGE_MY_PASS, {
          login: login,
          password: password,
          lastPassword: last_password,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Пароль изменен',
                content: '',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка изменения пароля',
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
            // ???
            if (err.error.error === 'wrong password or login') {
              document
                .getElementById('old-pass')
                ?.setAttribute('style', 'outline: 2px solid #eb4f4f;');
            }
            // ???
            resolve(false);
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

    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.CHANGE_PASS, {
          login: login,
          password: password,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Пароль изменен',
                content: '',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка изменения пароля',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
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
            resolve(false);
          },
        });
    });
  }

  delete(id: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.DELETE, {
          id: id,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления пользователя',
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

  get(id: string | undefined, param: string) {
    id = id ? '/' + id : '';
    if (!param) {
      param = id;
    }
    return new Promise<IUser[] | null>((resolve) => {
      this.http
        .get<IUsersState>(environment.url + api.GET + param + id)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.users);
            else {
              this.alert.show({
                title: 'Ошибка получения пользователей',
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

  add(
    avatar: string,
    login: string,
    password: string,
    name: string,
    role: string,
    userTags: string[]
  ) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IRegisterState>(environment.url + api.SIGN_UP, {
          login: login,
          password: password,
          role: role,
          name: name,
          avatar: avatar,
          userTags: userTags,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Пользователь добавлен',
                content: res.error,
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка добавления пользователя',
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

  rename(login: string, name: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.RENAME, {
          login: login,
          name: name,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Имя пользователя изменено',
                content: '',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка изменения имени пользователя',
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

  uploadAvatar(id: string, avatar: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post(environment.url + api.LOAD_AVATAR, {
          id: id,
          avatar: avatar,
        })
        .subscribe({
          next: (res) => {
            if (res['success']) {
              this.alert.show({
                type: 'success',
                title: 'Аватар обновлен',
                content: '',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка загрузки аватара',
                content: res['error'],
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

  changeTag(id: string, userTags: string[]) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.EDIT_TAG, {
          id: id,
          userTags: userTags,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Подразделение обновлено',
                content: '',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка редактирования подразделения',
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

  // deleteTag(userTags: string) {
  //   return new Promise<boolean>((resolve) => {
  //     this.http
  //       .post<IState>(environment.url + api.DELETE_TAG, {
  //         userTags: userTags,
  //       })
  //       .subscribe({
  //         next: (res) => {
  //           if (res.success) {
  //             this.alert.show({
  //               type: 'success',
  //               title: 'Подразделение удалено',
  //               content: '',
  //             });
  //             resolve(true);
  //           } else {
  //             this.alert.show({
  //               title: 'Ошибка удаления подразделения',
  //               content: res.error,
  //             });
  //             resolve(false);
  //           }
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.alert.show({
  //             title: err.name,
  //             content: err.message,
  //           });
  //           resolve(false);
  //         },
  //       });
  //   });
  // }

  getTags() {
    return new Promise<string[] | null>((resolve) => {
      this.http.get<IUserTagsState>(environment.url + api.GET_TAGS).subscribe({
        next: (res) => {
          if (res.success) resolve(res.userTags);
          else {
            this.alert.show({
              title: 'Ошибка получения подразделений',
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

  getPermissions() {
    return new Promise<IGroupPermissions[] | null>((resolve) => {
      this.http
        .get<IGroupPermissionsState>(environment.url + api.GET_PERMISSIONS)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.permissions);
            else {
              this.alert.show({
                title: 'Ошибка получения разрешений',
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

  changePermissions(body: object) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.EDIT_PERMISSIONS, body)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка редактирования разрешений',
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
