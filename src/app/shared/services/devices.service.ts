import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { IAddDevice, IDevice } from '../types/devices';
import { DevicesState, SingleDeviceState, State } from '../types/states';

import { devicesPaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  get(param: string, group_id?: string) {
    let url = environment.url + api.GET + param;
    if (param === 'group') {
      url = url + `/${group_id}`;
    }
    return new Promise<DevicesState>((resolve, reject) => {
      this.http.get<DevicesState>(url).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  add(device: IAddDevice) {
    return new Promise<SingleDeviceState>((resolve, reject) => {
      this.http
        .post<SingleDeviceState>(environment.url + api.ADD, device)
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

  edit(devices: IDevice[]) {
    return new Promise<SingleDeviceState>((resolve, reject) => {
      this.http
        .post<SingleDeviceState>(environment.url + api.EDIT, {
          edit: devices,
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

  delete(devIDs: string[]) {
    return new Promise<SingleDeviceState>((resolve, reject) => {
      this.http
        .post<SingleDeviceState>(environment.url + api.REMOVE, {
          remove: devIDs,
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

  reload(devIDs: string) {
    return new Promise<State>((resolve, reject) => {
      this.http
        .post<State>(environment.url + api.REBOOT, {
          id: devIDs,
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
}
