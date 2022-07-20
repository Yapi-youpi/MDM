import { Component, OnInit } from "@angular/core";
import { appsService, userService } from "../../../shared/services";
import { AppState } from "../../../shared/types/states";
import { interval } from "rxjs";

@Component({
  selector: "app-apps",
  templateUrl: "./apps.component.html",
  styleUrls: ["./apps.component.scss"],
})
export class AppsComponent implements OnInit {
  public isSystemAppsShown: boolean = false;

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;

  constructor(
    private userService: userService,
    private appsService: appsService
  ) {}

  ngOnInit(): void {
    const i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getApps();
      }
    });
  }

  getApps() {
    this.appsService
      .get("all")
      .then((res) => {
        console.log(res);
        // if (res) {
        //   // console.log(res);
        // } else {
        //   console.log(res);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleSystemApps() {
    this.isSystemAppsShown = !this.isSystemAppsShown;

    // code
  }

  toggleNameSortAsc() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }
  toggleSizeSortAsc() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }
}
