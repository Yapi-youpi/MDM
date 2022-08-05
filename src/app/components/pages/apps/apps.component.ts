import { Component } from '@angular/core';
import { interval } from 'rxjs';

import {
  alertService,
  appsService,
  userService,
} from '../../../shared/services';
import { add, edit } from '../../../shared/services/forms/app';

import { AppState, State, UploadAppState } from '../../../shared/types/states';
import { App } from '../../../shared/types/apps';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
})
export class AppsComponent {
  public loading: boolean = true;
  public apps: App[] = [];
  public currApp!: App;

  public searchParam: string = '';

  public isOnlySystemApps: boolean = false;

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;

  constructor(
    private user: userService,
    private appsService: appsService,
    private addAppForm: add,
    private editAppForm: edit,
    private alert: alertService
  ) {}

  ngOnInit(): void {
    const i = interval(1000).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.getApps();
      }
    });
  }

  getApps() {
    this.loading = true;

    this.appsService.get('all').then((res: AppState) => {
      if (res.success) {
        console.log('GET APPS REQ: ', res.app);

        if (res.app) {
          res.app.forEach((a) => {
            if (a.ID === a.parentAppID) this.apps.push({ ...a, children: [] });
          });

          res.app.forEach((a) => {
            if (a.parentAppID !== a.ID) {
              this.apps.map((ag) => {
                if (a.parentAppID === ag.ID) {
                  if (ag.children?.length === 0)
                    return {
                      ...ag,
                      children: ag.children.push(a),
                    };
                  else {
                    if (ag.children?.includes(a)) return ag;
                    else
                      return {
                        ...ag,
                        children: ag.children?.push(a),
                      };
                  }
                } else return ag;
              });
            }
          });

          this.sortChildrenByVCode();
        }
      } else {
        this.alert.show({
          title: 'GET APPS ERROR',
          content: res.error,
        });
      }
    });

    this.loading = false;
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.isOnlySystemApps = !this.isOnlySystemApps;
  }

  toggleNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  toggleSizeSortDir() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }

  uploadApp() {
    this.loading = true;

    this.appsService
      .upload(this.addAppForm._file)
      .then((res: UploadAppState) => {
        if (res.success) {
          console.log(res);

          // 1. Если у добавляемого приложения есть уже существующий родственник:
          //   1.1. Если у родственника нет потомков, тогда сравнить версии.
          //     1.1.2. Сделать добавляемое приложение родителем, а родственника потомком, если версия добавляемого выше, чем у родственника.
          //     1.1.3. Иначе наоборот - сделать добавляемое приложение потомком, а родственника родителем.
          //   1.2. Если у родственника (родителя) есть потомки:
          //     1.2.1. Если у добавляемого приложения версия выше, чем у родителя, то добавляемое приложение сделать новым родителем, а текущего сделать старшим потомком.
          //     1.2.2. Иначе сделать добавляемое приложение потомком и отсортировать новый список потомков.
          // 2. Иначе добавить в список как одиночку.

          // if (res.app.parentAppID === res.app.ID)
          //   this.apps = [res.app, ...this.apps];
          // else {
          //   this.apps.map((ag) => {
          //     if (res.app.parentAppID === ag.ID) {
          //       if (ag.children?.length === 0)
          //         return {
          //           ...ag,
          //           children: ag.children.push(ag),
          //         };
          //       else {
          //         if (ag.children?.includes(ag)) return ag;
          //         else
          //           return {
          //             ...ag,
          //             children: ag.children?.push(ag),
          //           };
          //       }
          //     } else return ag;
          //   });
          // }

          // if (res.app.parentAppID === res.app.ID || res.app.parentAppID === '')
          //   this.apps = [res.app, ...this.apps];
          // else {
          //   this.apps.map((ag) => {
          //     if (ag.ID === res.app.parentAppID) {
          //       if (ag.children?.length === 0)
          //         return {
          //           ...ag,
          //           children: ag.children.push({
          //             ...res.app,
          //             children: [],
          //           }),
          //         };
          //       else {
          //         if (ag.children?.includes(res.app)) return ag;
          //         else
          //           return {
          //             ...ag,
          //             children: ag.children?.push({
          //               ...res.app,
          //               children: [],
          //             }),
          //           };
          //       }
          //     } else return ag;
          //   });
          // }

          this.sortChildrenByVCode();

          const modal = document.querySelector('#add_app');
          modal?.classList.toggle('hidden');

          this.addAppForm.resetForm();
        } else {
          this.alert.show({
            title: 'UPLOAD APP ERROR',
            content: res.error,
          });
        }
      });

    this.loading = false;
  }

  selectAppToEdit(app: App) {
    this.currApp = app;
    this.editAppForm.form.patchValue(app);
  }

  editApp() {
    this.loading = true;

    this.appsService
      .edit({
        ID: this.currApp.ID,
        ...this.editAppForm.form.getRawValue(),
      })
      .then((res: State) => {
        if (res.success) {
          this.apps = this.apps.map((ag) => {
            if (ag.ID === this.currApp.ID) {
              return {
                ...ag,
                ...this.editAppForm.form.getRawValue(),
              };
            } else {
              return {
                ...ag,
                children: ag.children.map((child) => {
                  if (child.ID === this.currApp.ID) {
                    return {
                      ...child,
                      ...this.editAppForm.form.getRawValue(),
                    };
                  } else return child;
                }),
              };
            }
          });

          const modal = document.querySelector('#edit_app');
          modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT APP ERROR',
            content: res.error,
          });
        }
      });

    this.loading = false;
  }

  selectAppToDelete(app: App) {
    this.currApp = app;
  }

  deleteApp() {
    this.loading = true;

    this.appsService
      .delete(this.currApp)
      .then((res: { success: boolean; error: string }) => {
        if (res.success) {
          // Элемент оказался одиночкой или родителем
          if (this.currApp.ID === this.currApp.parentAppID) {
            // Если одиночка
            if (this.currApp.children.length === 0)
              this.apps = this.apps.filter((a) => a.ID !== this.currApp.ID);
            // Если родитель
            else {
              const firstChild: App = this.currApp.children[0];
              const restChildren: App[] = this.currApp.children
                ?.filter((child) => child.ID !== firstChild.ID)
                .map((child) => {
                  return {
                    ...child,
                    parentAppID: firstChild.ID,
                  };
                });

              this.apps = this.apps.map((a) => {
                if (a.ID === this.currApp.ID)
                  return { ...firstChild, children: [...restChildren] };
                else return a;
              });
            }
          } else {
            // Элемент оказался потомком
            this.apps = this.apps.map((a) => {
              if (a.ID === this.currApp.parentAppID)
                return {
                  ...a,
                  children: a.children.filter(
                    (child) => child.ID !== this.currApp.ID
                  ),
                };
              else return a;
            });
          }

          // this.sortChildrenByVCode();

          const modal = document.querySelector('#delete_app');
          modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'DELETE APP ERROR',
            content: res.error,
          });
        }
      });

    this.loading = false;
  }

  sortChildrenByVCode() {
    this.apps.map((a) => {
      return {
        ...a,
        children: a.children.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }
}
