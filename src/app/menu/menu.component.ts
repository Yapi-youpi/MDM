import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import M from "materialize-css";
import { AssetService } from "../services/asset.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  public isSidebarHidden: boolean = false;

  constructor(
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

  ngOnInit(): void {
    let path = window.location.pathname.slice(1);
    let elem = document.getElementById(`${path}`);
    if (elem) {
      elem.classList.add("active");
    }
  }

  toggleSidebarView() {
    this.isSidebarHidden = !this.isSidebarHidden;
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
