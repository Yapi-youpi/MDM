import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Groups } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups(parameter: string) {
    const url = environment.url + "/get_device_group/" + parameter;
    return new Promise<Groups[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (
          res:
            | {
                success: boolean;
                error: string;
                devicesGroups: Groups[];
              }
            | any
        ) => {
          resolve(res.devicesGroups);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  addGroups(name: string) {
    const url = environment.url + "/add_device_group";
    const body = {
      name,
    };
    return new Promise((resolve, reject) => {
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

  changeState(activeState: boolean, id: string) {
    const url = environment.url + "/change_active_state_device_group";
    const body = {
      id,
      activeState,
    };
    return new Promise((resolve, reject) => {
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

  removeGroup(id: string) {
    const url = environment.url + "/remove_device_group";
    const body = {
      id,
    };
    return new Promise((resolve, reject) => {
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

  renameGroup(id: string, name: string) {
    const url = environment.url + "/rename_device_group";
    const body = {
      id,
      name,
    };
    return new Promise((resolve, reject) => {
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

  removeGroupWithDevices(id: string) {
    const url = environment.url + "/remove_device_group_and_all_devices";
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
