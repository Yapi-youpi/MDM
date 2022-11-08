import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { configsPaths as api } from '../enums/api';
import { IConfig, IConfigsState, IState } from '../types';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class ConfigsService {
  constructor(private http: HttpClient, private alert: alertService) {}

  get(param: 'all' | 'default' | string) {
    return new Promise<IConfig[] | null>((resolve) => {
      this.http
        .get<IConfigsState>(environment.url + api.GET + param)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.devicesConfigs);
            else {
              this.alert.show({
                title: 'Ошибка получения списка конфигураций',
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

  add(config: IConfig | undefined, name: string, description: string) {
    if (config) {
      config.name = name;
      config.description = description;
    }
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.ADD, {
          ...config,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка добавления конфигурации',
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

  edit(config: IConfig) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.EDIT, {
          ...config,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка редактирования конфигурации',
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

  // renameConfig(id: string, name: string) {
  //   const body = {
  //     id,
  //     name,
  //   };
  //   return new Promise<any>((resolve, reject) => {
  //     this.http.post(environment.url + api.RENAME, body).subscribe({
  //       next: (res) => resolve(res),
  //       error: (err) => reject(err),
  //     });
  //   });
  // }

  delete(id: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.DELETE, {
          id,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления конфигурации',
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

  // getRestrictions() {
  //   return new Promise<string>((resolve, reject) => {
  //     this.http.get(environment.url + api.GET_RESTRICTIONS).subscribe({
  //       next: (
  //         res:
  //           | {
  //               error: string;
  //               success: boolean;
  //               defaultRestrictions: string;
  //             }
  //           | any
  //       ) => {
  //         resolve(res.defaultRestrictions);
  //       },
  //       error: (err) => reject(err),
  //     });
  //   });
  // }

  uploadWallpaper(cID: string, wallBase64: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.UPLOAD_WP, {
          id: cID,
          wallpaper: wallBase64,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка загрузки изображения',
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

  removeWallpaper(cID: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.REMOVE_WP, {
          id: cID,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления изображения',
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
