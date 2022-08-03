import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

import { appsPaths as api } from "../enums/api";
import { App } from "../types/apps";

@Injectable({
  providedIn: "root",
})
export class AppsService {
  constructor(private http: HttpClient) {}

  get(param: string) {
    const url = environment.url + api.GET + param;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  upload(file: FormData) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.UPLOAD, file).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  edit(app: App) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.EDIT, app).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  delete(app: App) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.DELETE, { app_id: app.ID })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  addAppToInstall(configId, appId) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.ADD_TO_INST, {
          configId: configId,
          appId: appId,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
  removeAppFromInstall(configId, appId) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.REMOVE_FROM_INST, {
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
