import { Component } from "@angular/core";
import {
  alertService,
  appsService,
  userService,
} from "../../../shared/services";
import { interval } from "rxjs";
import { AppState, UploadAppState } from "../../../shared/types/states";
import { add, edit } from "../../../shared/services/forms/app";
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
      console.log(res);
      if (res.success) {
        this.loading = false;
        this.apps = res.app;
      } else {
        this.alert.show({
          title: "GET APPS ERROR",
          content: res.error,
        });
      }
    });
  }

  uploadApp() {
    this.appsService
      .upload(this.addAppForm._file)
      .then((res: UploadAppState) => {
        if (res.success) {
          this.apps = [{ ...res.app, name: res.app["appName"] }, ...this.apps];

          const modal = document.querySelector("#add_app");
          modal?.classList.toggle("hidden");
        } else {
          this.alert.show({
            title: "UPLOAD APP ERROR",
            content: res.error,
          });
        }
      });
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

  selectAppToEdit(app: App) {
    this.currApp = app;
    this.editAppForm.form.patchValue(app);
  }

  editApp() {
    this.appsService
      .edit({
        ID: this.currApp.ID,
        ...this.editAppForm.form.getRawValue(),
      })
      .then((res: { success: boolean; error: string }) => {
        if (res.success) {
          this.apps = this.apps.map((a) => {
            if (a.ID === this.currApp.ID) {
              return {
                ...a,
                ...this.editAppForm.form.getRawValue(),
              };
            } else return a;
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
  }

  selectAppToDelete(app: App) {
    this.currApp = app;
  }

  deleteApp() {
    this.appsService
      .delete(this.currApp)
      .then((res: { success: boolean; error: string }) => {
        if (res.success) {
          this.apps = this.apps.filter((a) => a.ID !== this.currApp.ID);

          const modal = document.querySelector("#delete_app");
          modal?.classList.toggle("hidden");
        } else {
          this.alert.show({
            title: "DELETE APP ERROR",
            content: res.error,
          });
        }
      });
  }
}
