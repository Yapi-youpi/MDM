import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import M from "materialize-css";
import { UserService } from "../../../shared/services/user.service";
import { AssetService } from "../../../shared/services/asset.service";
import { interval } from "rxjs";
import { DatabaseService } from "../../../shared/services/database.service";
import { ErrorService } from "../../../shared/services/error.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  public isPasswordVisible: boolean = false;
  public error = "";

  constructor(
    private auth: AuthService,
    private router: Router,
    public user: UserService,
    public asset: AssetService,
    public err: ErrorService,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(login: string, password: string) {
    this.error = "";
    this.auth
      .login(login, password)
      .then(
        (res: {
          success: boolean;
          error: string;
          id: string;
          token: string;
        }) => {
          this.asset.setToStorage("token", res.token).then();
          this.asset.setToStorage("login", login).then();
          this.asset.setToStorage("last_password", password).then();
          this.user.token = res.token;
          this.user.login = login;
          this.user.last_password = password;
          this.db
            .signup(login, password)
            .then((res) => {
              console.log(res, "Log In res");
            })
            .catch((err) => {
              if (err === 400) {
                this.db
                  .logIN(login, password)
                  .then((res) => {
                    console.log(res, "Log In res");
                  })
                  .catch((err) => {
                    console.log(err, "Log In err");
                  });
              }
            });
          this.router.navigateByUrl("devices").then(() => {
            if (res.error === "change super admin password") {
              let i = interval(1000).subscribe(() => {
                let elem = document.querySelector(".modal");
                const options = {
                  dismissible: false,
                };
                if (elem) {
                  i.unsubscribe();
                  M.Modal.init(elem, options);
                  let instance = M.Modal.getInstance(elem);
                  instance.open();
                }
              });
            }
          });
        }
      )
      .catch((err) => {
        console.log(err);
        this.error = err.error.error;
      });
  }
}
