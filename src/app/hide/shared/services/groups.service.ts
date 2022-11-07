import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { groupsPaths as api } from '../enums/api';

import { IGroup, IGroupsState, IGroupState, IState } from '../types';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient, private alert: alertService) {}

  get(parameter: string) {
    return new Promise<IGroup[] | null>((resolve) => {
      this.http
        .get<IGroupsState>(environment.url + api.GET + parameter)
        .subscribe({
          next: (res) => {
            if (res.success) resolve(res.devicesGroups);
            else {
              this.alert.show({
                title: 'Ошибка получения списка групп устройств',
                content: res.error,
              });
              resolve(null);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(null);
          },
        });
    });
  }

  add(group: IGroup) {
    return new Promise<IGroup[] | null>((resolve) => {
      this.http.post<IGroupState>(environment.url + api.ADD, group).subscribe({
        next: (res) => {
          if (res.success) resolve(res.group);
          else {
            this.alert.show({
              title: 'Ошибка добавления группы устройств',
              content: res.error,
            });
            resolve(null);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.alert.show({
            title: err.name,
            content: err.message,
          });
          resolve(null);
        },
      });
    });
  }

  edit(groups: IGroup[]) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.EDIT_SEVERAL, {
          groups: groups,
        })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка редактирования групп(-ы) устройств',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(false);
          },
        });
    });
  }

  delete(group: IGroup) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(
          environment.url +
            (group.capacity === 0 ? api.DELETE : api.DELETE_WITH_DEVICES),
          { id: group.id }
        )
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления групп(-ы) устройств',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(false);
          },
        });
    });
  }

  deleteSeveral(groups: IGroup[]) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.DELETE_SEVERAL, { groups: groups })
        .subscribe({
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления групп(-ы) устройств',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(false);
          },
        });
    });
  }
}
