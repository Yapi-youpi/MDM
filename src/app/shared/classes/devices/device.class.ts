import { Injectable } from '@angular/core';
import { DevicesService } from '../../services/devices.service';
import { AlertService } from '../../services/alert.service';
import { IAddDevice, IDevice, IDevice as CDevice } from '../../types/devices';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceClass {
  public loading: boolean = false;

  public array: CDevice[] = [];
  public current: BehaviorSubject<CDevice | null> =
    new BehaviorSubject<CDevice | null>(null);
  public selectedIDs: string[] = [];

  constructor(private service: DevicesService, private alert: AlertService) {}

  private resetLoading() {
    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.loading = false;
    });
  }

  // ОБНОВЛЕНИЕ ТЕКУЩЕГО ВЫБРАННОГО УСТРОЙСТВА

  setCurrent(device: IDevice | null) {
    this.current.next(device);
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

  setSelectionTotal(value: boolean) {
    this.array.map((d) => {
      d.isSelected = value;
    });
  }

  setElementSelection(device: IDevice) {
    this.array.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedIDs.includes(d.device_id))
          this.selectedIDs.push(d.device_id);

        if (!d.isSelected && this.selectedIDs.includes(d.device_id))
          this.selectedIDs = this.selectedIDs.filter(
            (sd) => sd !== d.device_id
          );
      }
    });
  }

  get arrayLength() {
    return this.array.length;
  }

  // ОБНОВЛЕНИЕ СПИСКА ВЫБРАННЫХ УСТРОЙСТВ

  setListOfSelected(devices: IDevice[]) {
    this.selectedIDs = devices.map((d) => d.device_id);
  }

  get listOfSelectedLength() {
    return this.selectedIDs.length;
  }

  // ВЫЗОВЫ СЕРВИСА

  get(param: string, group_id?: string) {
    this.loading = true;

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
      .finally(() => this.resetLoading());
  }

  add(addDevice: IAddDevice) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

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
        .finally(() => this.resetLoading());
    });
  }

  edit(devices: CDevice[]) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      this.service
        .edit(devices)
        .then((res) => {
          if (res.success) {
            if (devices.length > 1) this.selectedIDs = [];
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка редактирования одного/нескольких устройств',
              content: res.error,
            });
            resolve(false);
          }
        })
        .finally(() => this.resetLoading());
    });
  }

  delete(devIDs: string[]) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      this.service
        .delete(devIDs)
        .then((res) => {
          if (res.success) {
            if (devIDs.length > 1) this.selectedIDs = [];
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка удаления одного/нескольких устройств',
              content: res.error,
            });
            resolve(false);
          }
        })
        .finally(() => this.resetLoading());
    });
  }

  reload(devID: string) {
    this.loading = true;

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
      .finally(() => this.resetLoading());
  }
}
