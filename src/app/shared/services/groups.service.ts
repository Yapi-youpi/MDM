import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { groupsPaths as api } from '../enums/api';

import { IGroup } from '../types/groups';
import { IGroupsState, IGroupState, IState } from '../types/states';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  get(parameter: string) {
    return new Promise<IGroupsState>((resolve, reject) => {
      this.http
        .get<IGroupsState>(environment.url + api.GET + parameter)
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

  add(group: IGroup) {
    return new Promise<IGroupState>((resolve, reject) => {
      this.http.post<IGroupState>(environment.url + api.ADD, group).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  edit(groups: IGroup[]) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.EDIT_SEVERAL, {
          groups: groups,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(group: IGroup) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(
          environment.url +
            (group.capacity === 0 ? api.DELETE : api.DELETE_WITH_DEVICES),
          { id: group.id }
        )
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  deleteSeveral(groups: IGroup[]) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.DELETE_SEVERAL, { groups: groups })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
