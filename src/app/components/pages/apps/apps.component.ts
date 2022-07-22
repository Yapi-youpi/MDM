import { Component } from '@angular/core';
import { appsService, userService } from "../../../shared/services";
import { interval } from "rxjs";
import { AppState } from "../../../shared/types/states";
import { add } from "../../../shared/services/forms/app";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  public isOnlySystemApps: boolean = false;

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
    this.appsService
      .get('all')
      .then((res: AppState) => {
        if (res.success) {
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
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleSystemApps() {
    this.isOnlySystemApps = !this.isOnlySystemApps;
  }
}
