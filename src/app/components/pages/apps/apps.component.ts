import { Component } from '@angular/core';
import { timer } from 'rxjs';

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
  public title = 'Приложения';
  public loading: boolean = true;
  public apps: App[] = [];
  public currApp!: App;
  public searchParam: string = '';
  public isSystemApps: boolean = false;
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
    this.loading = true;
    this.getApps();
    this.loading = false;
  }

  getApps() {
    this.appsService.get('all').then((res: AppState) => {
      if (res.success) {
        if (res.app) {
          console.log(res.app);
          if (this.apps.length !== 0) this.apps = [];
          // this.apps = res.app;

          res.app.forEach((a) => {
            if (a.ID === a.parentAppID)
              this.apps = [{ ...a, children: [] }, ...this.apps];
          });

          res.app.forEach((a) => {
            if (a.parentAppID !== a.ID) {
              this.apps = this.apps.map((ag) => {
                if (a.parentAppID === ag.ID) {
                  if (ag.children?.length === 0)
                    return {
                      ...ag,
                      children: [a, ...ag.children],
                    };
                  else {
                    if (ag.children?.includes(a)) return ag;
                    else
                      return {
                        ...ag,
                        children: [a, ...ag.children],
                      };
                  }
                } else return ag;
              });
            }
          });

          this.sortChildrenByVCode();

          // console.log(this.apps);

          this.apps = this.apps.map((ag) => {
            if (ag.children.length !== 0) {
              const head = { ...ag, children: [] };
              // const tail = ag.children[ag.children.length - 1];
              const tail = ag.children[0];

              return {
                ...tail,
                children: [
                  ...ag.children.filter((c) => c.ID !== tail.ID),
                  head,
                ],
              };
            } else return ag;
          });
        }
      } else {
        this.alert.show({
          title: 'GET APPS ERROR',
          content: res.error,
        });
      }
    });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.isSystemApps = !this.isSystemApps;
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
          if (res.app) {
            // Приложение - родитель
            if (res.app.parentAppID === res.app.ID) {
              this.getApps();
              // Приложение - потомок
            } else {
              this.apps = this.apps.map((ag) => {
                if (ag.ID === res.app?.parentAppID) {
                  // return { ...ag, children: [res.app, ...ag.children] };
                  return { ...ag, children: [...ag.children, res.app] };
                } else return ag;
              });
            }

            this.sortChildrenByVCode();
          }

          const modal = document.querySelector('#add_app');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');

          this.addAppForm.resetForm();
        } else {
          this.alert.show({
            title: 'UPLOAD APP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  selectAppToEdit(app: App) {
    this.currApp = app;
    this.editAppForm.form.patchValue(app);
    console.log(this.currApp);
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
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT APP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  selectAppToDelete(app: App) {
    this.currApp = app;
  }

  deleteApp() {
    this.loading = true;

    this.appsService
      .delete(this.currApp)
      .then((res: State) => {
        if (res.success) {
          if (this.currApp.children.length !== 0) {
            const appGroup = this.apps.filter(
              (ag) => ag.ID === this.currApp.ID
            )[0];
            const head = appGroup.children[0];
            const body = appGroup.children.filter((c) => c.ID !== head.ID);

            this.apps = this.apps.map((ag) => {
              if (ag.ID === this.currApp.ID) {
                return { ...head, children: body };
              } else return ag;
            });
          } else {
            if (this.apps.find((ag) => ag.ID === this.currApp.ID))
              this.apps = this.apps.filter((ag) => ag.ID !== this.currApp.ID);
            else
              this.apps = this.apps.map((ag) => {
                return {
                  ...ag,
                  children: ag.children.filter((c) => c.ID !== this.currApp.ID),
                };
              });
          }

          const modal = document.querySelector('#delete_app');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'DELETE APP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
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
