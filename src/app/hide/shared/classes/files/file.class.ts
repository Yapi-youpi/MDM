import { Injectable } from '@angular/core';
import { fileService } from '../../services';
import { DeviceClass } from '../devices';
import { IFile } from '../../types';
import { GroupClass } from '../groups/group.class';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class FileClass {
  public current: IFile | null = null;

  constructor(
    private _loading: LoaderClass,
    private _service: fileService,
    private _devices: DeviceClass,
    private _groups: GroupClass
  ) {}

  setCurrent(file: IFile | null) {
    this.current = file;
  }

  upload(entity: 'device' | 'group', eID: string, file: FormData) {
    return new Promise<boolean>((resolve) => {
      this._loading.start('files');

      this._service.upload(entity, eID, file).then((res) => {
        if (res) {
          switch (entity) {
            case 'device': {
              const device = this._devices.current;

              if (device) {
                if (device.device_info.files) {
                  this._devices.setCurrent({
                    ...device,
                    device_info: {
                      ...device.device_info,
                      files: [res, ...device.device_info.files],
                    },
                  });
                } else {
                  this._devices.setCurrent({
                    ...device,
                    device_info: {
                      ...device.device_info,
                      files: [res],
                    },
                  });
                }
                this.setCurrent(res);
              }
              break;
            }
            case 'group': {
              const group = this._groups.current;

              if (group) {
                if (group.files) {
                  this._groups.setCurrent({
                    ...group,
                    files: [res, ...group.files],
                  });
                } else {
                  this._groups.setCurrent({
                    ...group,
                    files: [res],
                  });
                }
                this.setCurrent(res);
              }
              break;
            }
          }
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loading.end());
  }

  delete(entity: 'device' | 'group', eID: string, fID: string) {
    return new Promise<boolean>((resolve) => {
      this._loading.start('files');

      this._service.delete(entity, eID, fID).then((res) => {
        if (res) {
          switch (entity) {
            case 'device': {
              const device = this._devices.current;

              if (device) {
                if (device.device_info.files)
                  this._devices.setCurrent({
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
              const group = this._groups.current;

              if (group) {
                this._groups.setCurrent({
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
        } else resolve(false);
      });
    }).finally(() => this._loading.end());
  }
}
