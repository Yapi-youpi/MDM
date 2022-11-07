import { Injectable } from '@angular/core';
import { IApp } from '../../types';
import { appsService } from '../../services';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class AppClass {
  private _rawApps: IApp[] = [];
  private _groupedApps: IApp[] = [];
  private _current: IApp | null = null;

  constructor(private _service: appsService, private _loader: LoaderClass) {}

  get rawApps() {
    return this._rawApps;
  }

  get groupedApps() {
    return this._groupedApps;
  }

  get current() {
    return this._current;
  }

  setCurrent(app: IApp | null) {
    this._current = app;
  }

  get(param: 'all' | string, isRaw: boolean = false) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service.get(param).then((res) => {
        if (res) {
          if (isRaw) {
            this._rawApps = res;
          } else {
            if (this._groupedApps.length !== 0) this._groupedApps = [];

            res.forEach((a) => {
              if (a.ID === a.parentAppID)
                this._groupedApps = [
                  { ...a, children: [] },
                  ...this._groupedApps,
                ];
            });

            res.forEach((a) => {
              if (a.parentAppID !== a.ID) {
                this._groupedApps = this._groupedApps.map((ag) => {
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

            this._groupedApps = this._groupedApps.map((ag) => {
              if (ag.children.length !== 0) {
                const head = { ...ag, children: [] };
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
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  upload(file: FormData) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service.upload(file).then((res) => {
        if (res) {
          if (res.parentAppID === res.ID) {
            this.get('all').then();
          } else {
            this._groupedApps = this._groupedApps.map((ag) => {
              if (ag.ID === res?.parentAppID) {
                return { ...ag, children: [...ag.children, res] };
              } else return ag;
            });
          }

          this.sortChildrenByVCode();
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  edit(appID: string, formValues: IApp) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service
        .edit({
          ...formValues,
          ID: appID,
        })
        .then((res) => {
          if (res) {
            this._groupedApps = this._groupedApps.map((ag) => {
              if (ag.ID === appID) {
                return {
                  ...ag,
                  ...formValues,
                };
              } else {
                return {
                  ...ag,
                  children: ag.children.map((child) => {
                    if (child.ID === appID) {
                      return {
                        ...child,
                        ...formValues,
                      };
                    } else return child;
                  }),
                };
              }
            });
            resolve(true);
          } else resolve(false);
        });
    }).finally(() => this._loader.end());
  }

  delete(app: IApp) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service.delete(app).then((res) => {
        if (res) {
          if (app.children.length !== 0) {
            const appGroup = this._groupedApps.filter(
              (ag) => ag.ID === app.ID
            )[0];
            const head = appGroup.children[0];
            const body = appGroup.children.filter((c) => c.ID !== head.ID);

            this._groupedApps = this._groupedApps.map((ag) => {
              if (ag.ID === app.ID) {
                return { ...head, children: body };
              } else return ag;
            });
          } else {
            if (this._groupedApps.find((ag) => ag.ID === app.ID))
              this._groupedApps = this._groupedApps.filter(
                (ag) => ag.ID !== app.ID
              );
            else
              this._groupedApps = this._groupedApps.map((ag) => {
                return {
                  ...ag,
                  children: ag.children.filter((c) => c.ID !== app.ID),
                };
              });
          }
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  addToInstall(configID: string, appID) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service.addToInstall(configID, appID).then((res) => {
        if (res) {
          // ???
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  removeFromInstall(configID: string, appID) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('apps');

      this._service.removeFromInstall(configID, appID).then((res) => {
        if (res) {
          // ???
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  sortChildrenByVCode() {
    this._groupedApps.map((a) => {
      return {
        ...a,
        children: a.children.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }
}
