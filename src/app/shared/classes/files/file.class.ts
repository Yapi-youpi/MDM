import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { alertService, fileService } from '../../services';
import { DeviceClass } from '../devices/device.class';
import { IFile } from '../../types/files';
import { GroupClass } from '../groups/group.class';

@Injectable({
  providedIn: 'root',
})
export class FileClass {
  public loading: boolean = false;

  public current: BehaviorSubject<IFile | null> =
    new BehaviorSubject<IFile | null>(null);

  constructor(
    private files: fileService,
    private devices: DeviceClass,
    private groups: GroupClass,
    private alert: alertService
  ) {}

  resetLoading() {
    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.loading = false;
    });
  }

  setCurrent(file: IFile | null) {
    this.current.next(file);
  }

  upload(entity: 'device' | 'group', eID: string, file: FormData) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      this.files
        .upload(entity, eID, file)
        .then((res) => {
          if (res.success) {
            switch (entity) {
              case 'device': {
                const device = this.devices.current.value;

                if (device) {
                  if (device.device_info.files) {
                    this.devices.setCurrent({
                      ...device,
                      device_info: {
                        ...device.device_info,
                        files: [res.file, ...device.device_info.files],
                      },
                    });
                  } else {
                    this.devices.setCurrent({
                      ...device,
                      device_info: {
                        ...device.device_info,
                        files: [res.file],
                      },
                    });
                  }
                  this.setCurrent(res.file);
                }
                break;
              }
              case 'group': {
                const group = this.groups.current.value;

                if (group) {
                  if (group.files) {
                    this.groups.setCurrent({
                      ...group,
                      files: [res.file, ...group.files],
                    });
                  } else {
                    this.groups.setCurrent({
                      ...group,
                      files: [res.file],
                    });
                  }
                  this.setCurrent(res.file);
                }
                break;
              }
            }
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка загрузки файла',
              content: res.error,
            });
            resolve(false);
          }
        })
        .finally(() => this.resetLoading());
    });
  }

  delete(entity: 'device' | 'group', eID: string, fID: string) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      this.files
        .delete(entity, eID, fID)
        .then((res) => {
          if (res) {
            switch (entity) {
              case 'device': {
                const device = this.devices.current.value;

                if (device) {
                  if (device.device_info.files)
                    this.devices.setCurrent({
                      ...device,
                      device_info: {
                        ...device.device_info,
                        files: device.device_info.files.filter(
                          (f) => f.fileID !== fID
                        ),
                      },
                    });
                  this.setCurrent(null);
                }
                break;
              }
              case 'group': {
                const group = this.groups.current.value;

                if (group) {
                  this.groups.setCurrent({
                    ...group,
                    files: group.files
                      ? group.files.filter((f) => f.fileID !== fID)
                      : [],
                  });
                  this.setCurrent(null);
                }
                break;
              }
            }
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка удаления файла',
              content: '',
            });
            resolve(false);
          }
        })
        .finally(() => this.resetLoading());
    });
  }
}
