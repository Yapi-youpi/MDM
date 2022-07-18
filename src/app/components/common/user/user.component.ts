import { Component, ElementRef, HostListener } from "@angular/core";
import { Router } from "@angular/router";

import {
  assetService,
  authService,
  userService,
} from "../../../shared/services";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  public imgURL: string = "";
  public isPopupOpen: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private auth: authService,
    public user: userService,
    public router: Router,
    public asset: assetService
  ) {
    if (!this.user.token) {
      this.asset.getFromStorage("token").then((token: string) => {
        this.user.token = token;
      });
      this.asset.getFromStorage("login").then((login: string) => {
        this.user.login = login;
      });
    }
  }

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopupOpen = false;
    }
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  logout() {
    this.auth
      .logout(this.user.token, this.user.login)
      .then((res) => {
        if (res) {
          this.user.token = "";
          this.router.navigateByUrl("auth").then();
          this.asset.removeFromStorage("token").then();
          this.asset.removeFromStorage("name").then();
          this.asset.removeFromStorage("login").then();
        } else {
          console.log("Ошибка выхода из системы");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
