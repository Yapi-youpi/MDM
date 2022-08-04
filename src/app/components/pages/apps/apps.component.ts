import { Component } from "@angular/core";
import { interval } from "rxjs";

import {
  alertService,
  appsService,
  userService,
} from "../../../shared/services";
import { add, edit } from "../../../shared/services/forms/app";

import { AppState, UploadAppState } from "../../../shared/types/states";
import { App } from "../../../shared/types/apps";

@Component({
  selector: "app-apps",
  templateUrl: "./apps.component.html",
  styleUrls: ["./apps.component.scss"],
})
export class AppsComponent {
  public loading: boolean = true;
  public apps: App[] = [];
  public currApp!: App;

  public searchParam: string = "";

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

    this.appsService.get("all").then((res: AppState) => {
      if (res.success) {
        console.log(res.app);

        res.app.forEach((a) => {
          if (a.parentAppID === "") this.apps.push({ ...a, children: [] });
        });

        res.app.forEach((a) => {
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
        });

        this.sortChildrenByVCode();
      } else {
        this.alert.show({
          title: "GET APPS ERROR",
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
          if (res.app.parentAppID === "")
            this.apps = [
              {
                ...res.app,
                ID: res.app["appID"],
                name: res.app["appName"],
              },
              ...this.apps,
            ];
          else {
            this.apps.map((ag) => {
              if (ag.ID === res.app.parentAppID) {
                if (ag.children?.length === 0)
                  return {
                    ...ag,
                    children: ag.children.push({
                      ...res.app,
                      ID: res.app["appID"],
                      name: res.app["appName"],
                      children: [],
                    }),
                  };
                else {
                  if (ag.children?.includes(res.app)) return ag;
                  else
                    return {
                      ...ag,
                      children: ag.children?.push({
                        ...res.app,
                        ID: res.app["appID"],
                        name: res.app["appName"],
                        children: [],
                      }),
                    };
                }
              } else return ag;
            });
          }

          this.sortChildrenByVCode();

          const modal = document.querySelector("#add_app");
          modal?.classList.toggle("hidden");

          this.addAppForm.resetForm();
        } else {
          this.alert.show({
            title: "UPLOAD APP ERROR",
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
      .then((res: { success: boolean; error: string }) => {
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
                children: ag.children?.map((child) => {
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

          const modal = document.querySelector("#edit_app");
          modal?.classList.toggle("hidden");
        } else {
          this.alert.show({
            title: "EDIT APP ERROR",
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
          if (this.currApp.parentAppID === "") {
            if (this.currApp.children) {
              if (this.currApp.children.length === 0) {
                this.apps = this.apps.filter((ag) => ag.ID !== this.currApp.ID);
              } else {
                const firstChild: App = {
                  ...this.currApp.children[0],
                  parentAppID: "",
                  // children: [],
                };
                const restChildren: App[] = this.currApp.children
                  .filter((child) => child.ID !== firstChild?.ID)
                  .map((child) => {
                    return {
                      ...child,
                      parentAppID: firstChild.ID,
                    };
                  });

                this.apps = this.apps.map((ag) => {
                  if (ag.ID === this.currApp.ID) {
                    return {
                      ...firstChild,
                      children: restChildren,
                    };
                  } else return ag;
                });
              }
            }
          } else
            this.apps = this.apps.map((ag) => {
              if (ag.ID === this.currApp.parentAppID) {
                return {
                  ...ag,
                  children: ag.children?.filter(
                    (child) => child.ID !== this.currApp.ID
                  ),
                };
              } else return ag;
            });

          this.sortChildrenByVCode();

          const modal = document.querySelector("#delete_app");
          modal?.classList.toggle("hidden");
        } else {
          this.alert.show({
            title: "DELETE APP ERROR",
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
        children: a.children?.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }
}
