import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import {
  IAddDevice,
  IDevice,
  IDevicesState,
  IDeviceState,
  IState,
} from '../types';

import { devicesPaths as api } from '../enums/api';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient, private alert: alertService) {}

  get(param: string, group_id?: string) {
    let url = environment.url + api.GET + param;
    if (param === 'group') {
      url = url + `/${group_id}`;
    }
    return new Promise<IDevice[] | null>((resolve) => {
      this.http.get<IDevicesState>(url).subscribe({
        next: (res) => {
          if (res.success) resolve(res.devices);
          else {
            this.alert.show({
              title: 'Ошибка получения списка устройств',
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

  add(device: IAddDevice) {
    return new Promise<IDevice | null>((resolve) => {
      this.http
        .post<IDeviceState>(environment.url + api.ADD, device)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.device);
            else {
              this.alert.show({
                title: 'Ошибка добавления устройства',
                content: res.error,
              });
              resolve(null);
            }
          },
          error: (err) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(null);
          },
        });
    });
  }

  edit(devices: IDevice[]) {
    return new Promise<IDevice | null>((resolve) => {
      this.http
        .post<IDeviceState>(environment.url + api.EDIT, {
          edit: devices,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.device);
            else {
              this.alert.show({
                title: 'Ошибка редактирования одного/нескольких устройств',
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

  delete(devIDs: string[]) {
    return new Promise<IDevice | null>((resolve) => {
      this.http
        .post<IDeviceState>(environment.url + api.REMOVE, {
          remove: devIDs,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.device);
            else {
              this.alert.show({
                title: 'Ошибка удаления одного/нескольких устройств',
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

  reload(devIDs: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.REBOOT, {
          id: devIDs,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'Устройство будет перезагружено',
                content: 'Это может занять некоторое время',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка перезагрузки устройства',
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
