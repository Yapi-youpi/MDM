import { Injectable } from '@angular/core';
import { IConfig } from '../../types';
import { configsService } from '../../services';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class ConfigClass {
  public array: IConfig[] = [];
  public current: IConfig | null = null;
  public default: IConfig | null = null;

  constructor(private _loader: LoaderClass, private _service: configsService) {}

  setCurrent(config: IConfig | null) {
    this.current = config;
  }

  sort() {
    this.array.sort((a, b) => {
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    });
  }

  get(param: 'all' | 'default' | string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service.get(param).then((res) => {
        if (res) {
          if (param === 'default') this.default = res[0];
          else {
            this.array = res;
            this.sort();
          }
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  add(config: IConfig, name: string, description: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service.add(config, name, description).then((res) => {
        if (res) {
          this.array.push(config);
          this.sort();
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  edit(config: IConfig) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service.edit(config).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  delete(cID: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service.delete(cID).then((res) => {
        if (res) {
          this.array = this.array.filter((c) => c.ID !== cID);
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  uploadWallpaper(cID: string, wallBase64: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service
        .uploadWallpaper(cID, wallBase64)
        .then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  removeWallpaper(cID: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('configs');

      this._service.removeWallpaper(cID).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }
}
