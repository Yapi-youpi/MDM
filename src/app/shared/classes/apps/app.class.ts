import { Injectable } from '@angular/core';
import { IApp } from '../../types/apps';
import { AppLoaderClass } from './app-loader.class';
import { alertService, appsService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AppClass {
  public array: IApp[] = [];
  public current: IApp | null = null;

  constructor(
    private loader: AppLoaderClass,
    private service: appsService,
    private alert: alertService
  ) {}

  setCurrent(app: IApp | null) {
    this.current = app;
  }

  get(param: 'all' | string) {
    this.loader.start();

    this.service
      .get(param)
      .then((res) => {
        if (res.success) {
          if (res.app) {
            if (this.array.length !== 0) this.array = [];

            res.app.forEach((a) => {
              if (a.ID === a.parentAppID)
                this.array = [{ ...a, children: [] }, ...this.array];
            });

            res.app.forEach((a) => {
              if (a.parentAppID !== a.ID) {
                this.array = this.array.map((ag) => {
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

            this.array = this.array.map((ag) => {
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
        } else {
          this.alert.show({
            title: 'Ошибка получения списка приложений',
            content: res.error,
          });
        }
      })
      .finally(() => this.loader.end());
  }

  upload(file: FormData) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .upload(file)
        .then((res) => {
          if (res.success) {
            if (res.app) {
              if (res.app.parentAppID === res.app.ID) {
                this.get('all');
              } else {
                this.array = this.array.map((ag) => {
                  if (ag.ID === res.app?.parentAppID) {
                    return { ...ag, children: [...ag.children, res.app] };
                  } else return ag;
                });
              }

              this.sortChildrenByVCode();
            }
            resolve(true);
          } else {
            this.alert.show({
              title: 'Ошибка загрузки приложения',
              content: res.error,
            });
            resolve(false);
          }
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
          if (res.success) {
            this.array = this.array.map((ag) => {
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
          } else {
            this.alert.show({
              title: 'Ошибка редактирования приложения',
              content: res.error,
            });
            resolve(false);
          }
        })
        .finally(() => this.loader.end());
    });
  }

  delete(app: IApp) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service.delete(app).then((res) => {
        if (res.success) {
          if (app.children.length !== 0) {
            const appGroup = this.array.filter((ag) => ag.ID === app.ID)[0];
            const head = appGroup.children[0];
            const body = appGroup.children.filter((c) => c.ID !== head.ID);

            this.array = this.array.map((ag) => {
              if (ag.ID === app.ID) {
                return { ...head, children: body };
              } else return ag;
            });
          } else {
            if (this.array.find((ag) => ag.ID === app.ID))
              this.array = this.array.filter((ag) => ag.ID !== app.ID);
            else
              this.array = this.array.map((ag) => {
                return {
                  ...ag,
                  children: ag.children.filter((c) => c.ID !== app.ID),
                };
              });
          }
          resolve(true);
        } else {
          this.alert.show({
            title: 'Ошибка удаления приложения',
            content: res.error,
          });
          resolve(false);
        }
      });
    });
  }

  sortChildrenByVCode() {
    this.array.map((a) => {
      return {
        ...a,
        children: a.children.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }
}
