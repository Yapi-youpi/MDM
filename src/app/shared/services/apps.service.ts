import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appsPaths as api } from '../enums/api';
import { IApp } from '../types/apps';
import { IAppsState, IAppState, IState } from '../types/states';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  constructor(private http: HttpClient) {}

  get(param: string) {
    const url = environment.url + api.GET + param;

    return new Promise<IAppsState>((resolve, reject) => {
      this.http.get<IAppsState>(url).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  upload(file: FormData) {
    return new Promise<IAppState>((resolve, reject) => {
      this.http.post<IAppState>(environment.url + api.UPLOAD, file).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  edit(app: IApp) {
    return new Promise<IState>((resolve, reject) => {
      this.http.post<IState>(environment.url + api.EDIT, app).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  delete(app: IApp) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.DELETE, { app_id: app.ID })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  addToInstall(configId, appId) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.ADD_TO_INST, {
          configId: configId,
          appId: appId,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  removeFromInstall(configId, appId) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.REMOVE_FROM_INST, {
          configId: configId,
          appId: appId,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
