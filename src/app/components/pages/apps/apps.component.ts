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
  public appGroups: App[] = [];
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
        this.apps = res.app;

        res.app.forEach((a) => {
          if (a.parentAppID === "") this.appGroups.push({ ...a, children: [] });
          else
            this.appGroups = this.appGroups.map((ag) => {
              if (a.parentAppID === ag.ID) {
                // if (ag.children && ag.children.includes(a)) return ag;
                // else {
                //   ag.children = [a, ...ag.children];
                //   return {
                //     ...ag,
                //     children: ag.children.sort(
                //       (a, b) => parseInt(b.version) - parseInt(a.version)
                //     ),
                //   };
                // }
                if (ag.children) {
                  if (ag.children.includes(a)) return ag;
                  else {
                    ag.children = [a, ...ag.children];
                    return {
                      ...ag,
                      children: ag.children.sort(
                        (a, b) => parseInt(b.version) - parseInt(a.version)
                      ),
                    };
                  }
                } else return ag;
              } else return ag;
            });
        });

        console.log(this.appGroups);
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
          // console.log(res);
          this.apps = [
            { ...res.app, ID: res.app["appID"], name: res.app["appName"] },
            ...this.apps,
          ];

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

    console.log("App to edit: ", this.currApp.ID);

    // this.appsService
    //   .edit({
    //     ID: this.currApp.ID,
    //     ...this.editAppForm.form.getRawValue(),
    //   })
    //   .then((res: { success: boolean; error: string }) => {
    //     if (res.success) {
    //       this.apps = this.apps.map((a) => {
    //         if (a.ID === this.currApp.ID) {
    //           return {
    //             ...a,
    //             ...this.editAppForm.form.getRawValue(),
    //           };
    //         } else return a;
    //       });
    //
    //       const modal = document.querySelector("#edit_app");
    //       modal?.classList.toggle("hidden");
    //     } else {
    //       this.alert.show({
    //         title: "EDIT APP ERROR",
    //         content: res.error,
    //       });
    //     }
    //   });

    this.loading = false;
  }

  selectAppToDelete(app: App) {
    this.currApp = app;
  }

  deleteApp() {
    this.loading = true;

    console.log("App to delete: ", this.currApp.ID);

    // this.appsService
    //   .delete(this.currApp)
    //   .then((res: { success: boolean; error: string }) => {
    //     if (res.success) {
    //       this.apps = this.apps.filter((a) => a.ID !== this.currApp.ID);
    //
    //       const modal = document.querySelector("#delete_app");
    //       modal?.classList.toggle("hidden");
    //     } else {
    //       this.alert.show({
    //         title: "DELETE APP ERROR",
    //         content: res.error,
    //       });
    //     }
    //   });

    this.loading = false;
  }
}
