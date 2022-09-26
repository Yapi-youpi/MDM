import { Injectable } from '@angular/core';
import { IGroup } from '../../types/groups';
import { alertService, groupService } from '../../services';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupClass {
  public loading: boolean = false;

  public array: IGroup[] = [];
  public current: BehaviorSubject<IGroup | null> =
    new BehaviorSubject<IGroup | null>(null);
  public selectedIDs: string[] = [];

  constructor(private service: groupService, private alert: alertService) {}

  private resetLoading() {
    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.loading = false;
    });
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
        return g.id === this.current.value?.id ? { ...g, ...gValues } : g;
      });
    }
  }

  setSelectionTotal(value: boolean) {
    this.array.map((d) => {
      d.isSelected = value;
    });
  }

  setElementSelection(group: IGroup) {
    this.array.map((d) => {
      if (d.id === group.id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedIDs.includes(d.id))
          this.selectedIDs.push(d.id);

        if (!d.isSelected && this.selectedIDs.includes(d.id))
          this.selectedIDs = this.selectedIDs.filter((sg) => sg !== d.id);
      }
    });
  }

  // ОБНОВЛЕНИЕ ВЫБРАННЫХ ГРУПП

  setListOfSelected(groups: IGroup[]) {
    this.selectedIDs = groups.map((d) => d.id);
  }

  // ОБНОВЛЕНИЕ ТЕКУЩЕЙ ВЫБРАННОЙ ГРУППЫ

  setCurrent(group: IGroup | null) {
    this.current.next(group);
  }

  // ВЫЗОВЫ СЕРВИСА

  get(param: 'all' | string) {
    this.loading = true;

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
      .finally(() => this.resetLoading());
  }

  add(group: IGroup) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

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
    }).finally(() => this.resetLoading());
  }

  edit(groups: IGroup[]) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      this.service.edit(groups).then((res) => {
        if (res.success) {
          // this.array = this.array.map((g) => {
          //   return g.id === this.current.value?.id
          //     ? { ...g, ...this.editForm.values }
          //     : g;
          // });
          if (groups.length > 1) this.selectedIDs = [];
          resolve(true);
        } else {
          this.alert.show({
            title: 'Ошибка редактирования групп(-ы) устройств',
            content: res.error,
          });
          resolve(false);
        }
      });
    }).finally(() => this.resetLoading());
  }

  delete(groups: IGroup[], isSingle: boolean = false) {
    return new Promise<boolean>((resolve) => {
      this.loading = true;

      if (isSingle) {
        this.service
          .delete(groups[0])
          .then((res) => {
            if (res.success) {
              this.array = this.array.filter((g) => {
                return g.id !== this.current.value?.id;
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
          .finally(() => this.resetLoading());
      } else {
        this.service
          .deleteSeveral(groups)
          .then((res) => {
            if (res.success) {
              this.selectedIDs = [];
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка удаления групп устройств',
                content: res.error,
              });
              resolve(false);
            }
          })
          .finally(() => this.resetLoading());
      }
    });
  }
}
