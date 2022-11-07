import { Injectable } from '@angular/core';
import { deviceService } from '../../services';
import { IAddDevice, IDevice } from '../../types';
import { DeviceLoaderClass } from './device-loader.class';

@Injectable({
  providedIn: 'root',
})
export class DeviceClass {
  public array: IDevice[] = [];
  public current: IDevice | null = null;

  constructor(
    private loading: DeviceLoaderClass,
    private service: deviceService
  ) {}

  // ОБНОВЛЕНИЕ ТЕКУЩЕГО ВЫБРАННОГО УСТРОЙСТВА

  setCurrent(device: IDevice | null) {
    this.current = device;
  }

  // ОБНОВЛЕНИЕ СПИСКА

  addToList(device: IDevice) {
    this.array = [device, ...this.array];
  }

  updateList(device: IDevice, isDelete: boolean = false) {
    this.array = isDelete
      ? this.array.filter((d) => d.device_id !== device.device_id)
      : [
          ...this.array.map((d) => {
            if (d.device_id === device.device_id)
              return { ...device, isSelected: d.isSelected };
            else return d;
          }),
        ];
  }

  // ВЫЗОВЫ СЕРВИСА

  get(param: 'all' | string, group_id?: string) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .get(param, group_id)
        .then((res) => {
          if (res) {
            this.array = res
              ? res.map((d) => ({ ...d, isSelected: false }))
              : [];
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loading.end());
    });
  }

  add(addDevice: IAddDevice) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .add(addDevice)
        .then((res) => {
          if (res) {
            this.setCurrent(res);
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loading.end());
    });
  }

  edit(devices: IDevice[]) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .edit(devices)
        .then((res) => {
          if (res) resolve(true);
          else resolve(false);
        })
        .finally(() => this.loading.end());
    });
  }

  delete(devIDs: string[]) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .delete(devIDs)
        .then((res) => {
          if (res) resolve(true);
          else resolve(false);
        })
        .finally(() => this.loading.end());
    });
  }

  reload(devID: string) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .reload(devID)
        .then((res) => resolve(res))
        .finally(() => this.loading.end());
    });
  }
}
