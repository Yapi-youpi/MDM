import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appsPaths as api } from '../enums/api';
import { IApp } from '../types/apps';
import { IAppsState, IAppState, IState } from '../types/states';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  constructor(private http: HttpClient, private alert: alertService) {}

  get(param: string) {
    const url = environment.url + api.GET + param;

    return new Promise<IApp[] | null>((resolve) => {
      this.http.get<IAppsState>(url).subscribe({
        next: (res) => {
          if (res.success) resolve(res.app);
          else {
            this.alert.show({
              title: 'Ошибка получения приложений',
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

  upload(file: FormData) {
    return new Promise<IApp | null>((resolve) => {
      this.http.post<IAppState>(environment.url + api.UPLOAD, file).subscribe({
        next: (res) => {
          if (res.success) resolve(res.app);
          else {
            this.alert.show({
              title: 'Ошибка загрузки приложения',
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

  edit(app: IApp) {
    return new Promise<boolean>((resolve) => {
      this.http.post<IState>(environment.url + api.EDIT, app).subscribe({
        next: (res) => {
          if (res.success) resolve(true);
          else {
            this.alert.show({
              title: 'Ошибка редактирования приложения',
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

  delete(app: IApp) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.DELETE, { app_id: app.ID })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления приложения',
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

  addToInstall(configId, appId) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.ADD_TO_INST, {
          configId: configId,
          appId: appId,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка добавления приложения к установке',
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

  removeFromInstall(configId, appId) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.REMOVE_FROM_INST, {
          configId: configId,
          appId: appId,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления приложения из конфигурации',
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
