import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

import { appsPaths as api } from "../enums/api";

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  constructor(private http: HttpClient) {}

  get(param: string) {
    const url = environment.url + api.GET + param;

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

  getIcon(id: string) {
    const url = environment.url + api.GET_ICON + id;

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

  upload(file: FormData) {
    const url = environment.url + api.UPLOAD

    return new Promise<any>((resolve, reject) => {
      this.http.post(url, file).subscribe({
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
