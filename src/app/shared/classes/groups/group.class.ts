import { Injectable } from '@angular/core';
import { IGroup } from '../../types/groups';
import { alertService, groupService } from '../../services';
import { GroupLoaderClass } from './group-loader.class';

@Injectable({
  providedIn: 'root',
})
export class GroupClass {
  public array: IGroup[] = [];
  public current: IGroup | null = null;

  constructor(
    private loading: GroupLoaderClass,
    private service: groupService,
    private alert: alertService
  ) {}

  // ОБНОВЛЕНИЕ ТЕКУЩЕЙ ВЫБРАННОЙ ГРУППЫ

  setCurrent(group: IGroup | null) {
    this.current = group;
  }

  // ОБНОВЛЕНИЕ СПИСКА

  updateGroups(gValues?: IGroup, isSeveral: boolean = false, arr?: IGroup[]) {
    if (isSeveral) {
      arr?.forEach((a) => {
        this.array = this.array.map((g) => {
          if (g.id === a.id) return a;
          else return g;
        });
      });
    } else if (gValues) {
      this.array = this.array.map((g) => {
        return g.id === this.current?.id ? { ...g, ...gValues } : g;
      });
    }
  }

  // ВЫЗОВЫ СЕРВИСА

  get(param: 'all' | string) {
    this.loading.start();

    this.service
      .get(param)
      .then((res) => {
        if (res.success) {
          this.array = res.devicesGroups ? res.devicesGroups : [];
        } else {
          this.alert.show({
            title: 'Ошибка получения групп устройств',
            content: res.error,
          });
        }
      })
      .finally(() => this.loading.end());
  }

  add(group: IGroup) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service.add(group).then((res) => {
        if (res.success) {
          if (res.group?.[0]) this.array = [res.group[0], ...this.array];
          resolve(true);
        } else {
          this.alert.show({
            title: 'Ошибка добавления группы устройств',
            content: res.error,
          });
          resolve(false);
        }
      });
    }).finally(() => this.loading.end());
  }

  edit(groups: IGroup[]) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      this.service.edit(groups).then((res) => {
        if (res.success) {
          resolve(true);
        } else {
          this.alert.show({
            title: 'Ошибка редактирования групп(-ы) устройств',
            content: res.error,
          });
          resolve(false);
        }
      });
    }).finally(() => this.loading.end());
  }

  delete(groups: IGroup[], isSingle: boolean = false) {
    return new Promise<boolean>((resolve) => {
      this.loading.start();

      if (isSingle) {
        this.service
          .delete(groups[0])
          .then((res) => {
            if (res.success) {
              this.array = this.array.filter((g) => {
                return g.id !== this.current?.id;
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка удаления группы устройств',
                content: res.error,
              });
              resolve(false);
            }
          })
          .finally(() => this.loading.end());
      } else {
        this.service
          .deleteSeveral(groups)
          .then((res) => {
            if (res.success) {
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка удаления групп устройств',
                content: res.error,
              });
              resolve(false);
            }
          })
          .finally(() => this.loading.end());
      }
    });
  }
}
