import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DevicesConfig } from '../../interfaces/interfaces';
import { configsPaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class DevicesConfigService {
  constructor(private http: HttpClient) {}

  getConfig(param: string) {
    return new Promise<DevicesConfig[]>((resolve, reject) => {
      this.http.get(environment.url + api.GET + param).subscribe({
        next: (
          res:
            | {
                devicesConfigs: DevicesConfig[];
                error: string;
                success: boolean;
              }
            | any
        ) => {
          resolve(res.devicesConfigs);
        },
        error: (err) => reject(err),
      });
    });
  }

  addConfig(config: DevicesConfig | undefined, name: string, description: string) {
    if (config) {
      config.name = name;
      config.description = description;
    }
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.ADD, {
          ...config,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  editConfig(config: DevicesConfig) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.EDIT, {
          ...config,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  renameConfig(id: string, name: string) {
    const body = {
      id,
      name,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.RENAME, body).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  removeConfig(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.DELETE, {
          id,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
