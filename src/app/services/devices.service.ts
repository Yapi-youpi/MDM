import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Device } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  getDevice(param: string, group_id?: string) {
    let url = `${environment.url}/get_device/${param}`;
    if (param === 'group') {
      url = url + `/${group_id}`;
    }
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

  addDevice(device: Device) {
    const url = `${environment.url}/add_device`;
    const body = {
      ...device,
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

  removeDevice(id: string) {
    const url = `${environment.url}/remove_device`;
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

  editDevice(device: Device) {
    const url = `${environment.url}/edit_device`;
    const body = {
      ...device,
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
