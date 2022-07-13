import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

import { AddDevice, Device } from "../interfaces/devices";

import { devicesPaths as api } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  get(param: string, group_id?: string) {
    let url = environment.url + api.GET + param;
    if (param === "group") {
      url = url + `/${group_id}`;
    }
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

  add(device: AddDevice) {
    const url = environment.url + api.ADD;
    const body = {
      ...device,
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

  delete(device_id: string) {
    const url = environment.url + api.REMOVE;
    const body = {
      device_id,
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

  edit(device: Device) {
    const url = environment.url + api.EDIT;
    const body = {
      ...device,
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
}
