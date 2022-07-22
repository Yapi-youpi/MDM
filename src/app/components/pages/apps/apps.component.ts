import { Component } from '@angular/core';
import { appsService, userService } from "../../../shared/services";
import { interval } from "rxjs";
import { AppState, UploadAppState } from "../../../shared/types/states";
import { add } from "../../../shared/services/forms/app";
import { App } from "../../../shared/types/apps";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  public loading: boolean = false;
  public apps: App[] = [];

  public searchParam: string = '';

  public isOnlySystemApps: boolean = false;

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;

  constructor(private user: userService, private appsService: appsService, private addAppForm: add) { }

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

    this.appsService
      .get('all')
      .then((res: AppState) => {
        console.log(res);
        if (res.success) {
          this.loading = false;
          this.apps = res.app

          console.log(res.app);
        } else {
          console.log(res.error);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  uploadApp() {
    this.appsService
      .upload(this.addAppForm._file)
      .then((res: UploadAppState) => {
        if (res.success) {
          console.log(res.app)

          const modal = document.querySelector("#add_app");
          modal?.classList.toggle("hidden");
        } else {
          console.log(res.error)
        }
      })
      .catch(err => {
        console.log(err);
      })
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
}
