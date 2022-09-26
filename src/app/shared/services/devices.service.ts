import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { IAddDevice, IDevice } from '../types/devices';
import { IDevicesState, IDeviceState, IState } from '../types/states';

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
    return new Promise<IDevicesState>((resolve, reject) => {
      this.http.get<IDevicesState>(url).subscribe({
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
    return new Promise<IDeviceState>((resolve, reject) => {
      this.http
        .post<IDeviceState>(environment.url + api.ADD, device)
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
    return new Promise<IDeviceState>((resolve, reject) => {
      this.http
        .post<IDeviceState>(environment.url + api.EDIT, {
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
    return new Promise<IDeviceState>((resolve, reject) => {
      this.http
        .post<IDeviceState>(environment.url + api.REMOVE, {
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
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.REBOOT, {
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
