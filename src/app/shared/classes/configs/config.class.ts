import { Injectable } from '@angular/core';
import { IConfig } from '../../types/config';
import { ConfigLoaderClass } from './config-loader.class';
import { configsService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class ConfigClass {
  public array: IConfig[] = [];
  public current: IConfig | null = null;
  public default: IConfig | null = null;

  constructor(
    private loader: ConfigLoaderClass,
    private service: configsService
  ) {}

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
      this.loader.start();

      this.service
        .get(param)
        .then((res) => {
          if (res) {
            if (param === 'default') this.default = res[0];
            else {
              this.array = res;
              this.sort();
            }
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  add(config: IConfig, name: string, description: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .add(config, name, description)
        .then((res) => {
          if (res) {
            this.array.push(config);
            this.sort();
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  edit(config: IConfig) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .edit(config)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  delete(cID: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .delete(cID)
        .then((res) => {
          if (res) {
            this.array = this.array.filter((c) => c.ID !== cID);
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  uploadWallpaper(cID: string, wallBase64: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .uploadWallpaper(cID, wallBase64)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  removeWallpaper(cID: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .removeWallpaper(cID)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }
}
