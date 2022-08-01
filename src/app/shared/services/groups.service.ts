import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

import { groupsPaths as api } from "../enums/api";
import { DevicesGroup } from "../types/groups";

@Injectable({
  providedIn: "root",
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  get(parameter: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.url + api.GET + parameter).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  add(group: DevicesGroup) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.ADD, group).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  changeState(id: string, activeState: boolean) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.CHANGE_STATE, {
          id,
          activeState,
        })
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  // TODO: DELETE ARRAY OF GROUPS
  delete(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.DELETE, {
          id,
        })
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  rename(id: string, name: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.RENAME, {
          id,
          name,
        })
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  // TODO: EDIT ARRAY OF GROUPS
  edit(group: DevicesGroup) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.url + api.EDIT, group).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  }

  deleteWithDevices(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(environment.url + api.DELETE_WITH_DEVICES, {
          id,
        })
        .subscribe({
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
