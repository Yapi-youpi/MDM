import { Injectable } from '@angular/core';
import { alertService, deviceService } from '../../services';
import { IAddDevice, IDevice } from '../../types/devices';
import { DeviceLoaderClass } from './device-loader.class';

@Injectable({
  providedIn: 'root',
})
export class DeviceClass {
  public array: IDevice[] = [];
  public current: IDevice | null = null;

  constructor(
    private loading: DeviceLoaderClass,
    private service: deviceService,
    private alert: alertService
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
    this.loading.start();

    this.service
      .get(param, group_id)
      .then((res) => {
        if (res.success) {
          this.array = res.devices
            ? res.devices.map((d) => ({ ...d, isSelected: false }))
            : [];
        } else {
          this.alert.show({
            title: 'Ошибка получения списка устройств',
            content: res.error,
          });
        }
      })
      .finally(() => this.loading.end());
  }

  add(addDevice: IAddDevice) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service
        .add(addDevice)
        .then((res) => {
          if (res.success) {
            if (res.device) this.setCurrent(res.device);
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка добавления устройства',
              content: res.error,
            });
            resolve(false);
          }
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
          if (res.success) {
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка редактирования одного/нескольких устройств',
              content: res.error,
            });
            resolve(false);
          }
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
          if (res.success) {
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка удаления одного/нескольких устройств',
              content: res.error,
            });
            resolve(false);
          }
        })
        .finally(() => this.loading.end());
    });
  }

  reload(devID: string) {
    this.loading.start();

    this.service
      .reload(devID)
      .then((res) => {
        if (res.success) {
          this.alert.show({
            type: 'success',
            title: 'Устройство будет перезагружено',
            content: 'Это может занять некоторое время',
          });
        } else {
          this.alert.show({
            title: 'Ошибка перезагрузки устройства',
            content: res.error,
          });
        }
      })
      .finally(() => this.loading.end());
  }
}
