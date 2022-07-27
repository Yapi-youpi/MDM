import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { DevicesConfig } from "../../interfaces/interfaces";
import { configsPaths as api } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class DevicesConfigService {
  constructor(private http: HttpClient) {}

  get(param: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.url + api.GET + param).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  add(config: DevicesConfig | undefined, name: string, description: string) {
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

  rename(id: string, name: string) {
    const url = environment.url + api.RENAME;
    const body = {
      id,
      name,
    };
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  delete(id: string) {
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
