import { Injectable } from '@angular/core';
import { IGroup } from '../../types';
import { groupService } from '../../services';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class GroupClass {
  public array: IGroup[] = [];
  public current: IGroup | null = null;

  constructor(private _loading: LoaderClass, private _service: groupService) {}

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
    return new Promise<boolean>((resolve) => {
      this._loading.start('groups');

      this._service.get(param).then((res) => {
        if (res) {
          this.array = res ? res : [];
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loading.end());
  }

  add(group: IGroup) {
    return new Promise<boolean>((resolve) => {
      this._loading.start('groups');

      this._service.add(group).then((res) => {
        if (res) {
          if (res?.[0]) {
            this.array = [res[0], ...this.array];
            resolve(true);
          }
        } else resolve(false);
      });
    }).finally(() => this._loading.end());
  }

  edit(groups: IGroup[]) {
    return new Promise<boolean>((resolve) => {
      this._loading.start('groups');

      this._service.edit(groups).then((res) => {
        if (res) resolve(true);
        else resolve(false);
      });
    }).finally(() => this._loading.end());
  }

  delete(groups: IGroup[], isSingle: boolean = false) {
    return new Promise<boolean>((resolve) => {
      this._loading.start('groups');

      if (isSingle) {
        this._service.delete(groups[0]).then((res) => {
          if (res) {
            this.array = this.array.filter((g) => {
              return g.id !== this.current?.id;
            });
            resolve(true);
          } else resolve(false);
        });
      } else {
        this._service.deleteSeveral(groups).then((res) => {
          if (res) resolve(true);
          else resolve(false);
        });
      }
    }).finally(() => this._loading.end());
  }
}
