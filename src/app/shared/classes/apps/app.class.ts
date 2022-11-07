import { Injectable } from '@angular/core';
import { IApp } from '../../types';
import { AppLoaderClass } from './app-loader.class';
import { appsService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AppClass {
  public rawArray: IApp[] = [];
  public groupedArray: IApp[] = [];
  public current: IApp | null = null;

  constructor(private loader: AppLoaderClass, private service: appsService) {}

  setCurrent(app: IApp | null) {
    this.current = app;
  }

  get(param: 'all' | string, isRaw: boolean = false) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .get(param)
        .then((res) => {
          if (res) {
            if (isRaw) {
              this.rawArray = res;
            } else {
              if (this.groupedArray.length !== 0) this.groupedArray = [];

              res.forEach((a) => {
                if (a.ID === a.parentAppID)
                  this.groupedArray = [
                    { ...a, children: [] },
                    ...this.groupedArray,
                  ];
              });

              res.forEach((a) => {
                if (a.parentAppID !== a.ID) {
                  this.groupedArray = this.groupedArray.map((ag) => {
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

              this.groupedArray = this.groupedArray.map((ag) => {
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
        })
        .finally(() => this.loader.end());
    });
  }

  upload(file: FormData) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .upload(file)
        .then((res) => {
          if (res) {
            if (res.parentAppID === res.ID) {
              this.get('all').then();
            } else {
              this.groupedArray = this.groupedArray.map((ag) => {
                if (ag.ID === res?.parentAppID) {
                  return { ...ag, children: [...ag.children, res] };
                } else return ag;
              });
            }

            this.sortChildrenByVCode();
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  edit(appID: string, formValues: IApp) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .edit({
          ...formValues,
          ID: appID,
        })
        .then((res) => {
          if (res) {
            this.groupedArray = this.groupedArray.map((ag) => {
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
        })
        .finally(() => this.loader.end());
    });
  }

  delete(app: IApp) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service.delete(app).then((res) => {
        if (res) {
          if (app.children.length !== 0) {
            const appGroup = this.groupedArray.filter(
              (ag) => ag.ID === app.ID
            )[0];
            const head = appGroup.children[0];
            const body = appGroup.children.filter((c) => c.ID !== head.ID);

            this.groupedArray = this.groupedArray.map((ag) => {
              if (ag.ID === app.ID) {
                return { ...head, children: body };
              } else return ag;
            });
          } else {
            if (this.groupedArray.find((ag) => ag.ID === app.ID))
              this.groupedArray = this.groupedArray.filter(
                (ag) => ag.ID !== app.ID
              );
            else
              this.groupedArray = this.groupedArray.map((ag) => {
                return {
                  ...ag,
                  children: ag.children.filter((c) => c.ID !== app.ID),
                };
              });
          }
          resolve(true);
        } else resolve(false);
      });
    });
  }

  addToInstall(configID: string, appID) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .addToInstall(configID, appID)
        .then((res) => {
          if (res) {
            // ???
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  removeFromInstall(configID: string, appID) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .removeFromInstall(configID, appID)
        .then((res) => {
          if (res) {
            // ???
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  sortChildrenByVCode() {
    this.groupedArray.map((a) => {
      return {
        ...a,
        children: a.children.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }
}
