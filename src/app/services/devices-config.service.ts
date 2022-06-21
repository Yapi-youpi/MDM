import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DevicesConfig } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DevicesConfigService {
  constructor(private http: HttpClient) {}

  getConfig(param: string) {
    const url = environment.url + '/get_config/' + param;
    return new Promise<any>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  addConfig(config: DevicesConfig | undefined, name: string) {
    if (config) {
      config.name = name;
    }
    const url = environment.url + '/add_config';
    const body = {
      ...config,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  renameConfig(id: string, name: string) {
    const url = environment.url + '/rename_config';
    const body = {
      id,
      name,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  removeConfig(id: string) {
    const url = environment.url + '/remove_config';
    const body = {
      id,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
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
