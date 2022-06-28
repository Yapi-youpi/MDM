import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import M from "materialize-css";

import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { AssetService } from "../../../services/asset.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  @ViewChild("popup_btn") public btnRef!: ElementRef;
  @ViewChild("popup") public popupRef!: ElementRef;

  public isPopupOpen: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private auth: AuthService,
    public user: UserService,
    public router: Router,
    public asset: AssetService
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
  onGlobalClick(event): void {
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
          M.toast({ html: "Ошибка" });
        }
      })
      .catch((err) => {
        M.toast({ html: err.error.error });
      });
  }
}
