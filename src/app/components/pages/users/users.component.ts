import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";

import M from "materialize-css";

import { Users } from "../../../interfaces/users";

import { UserService } from "../../../shared/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  public form: FormGroup;
  public users: Users[] = [];
  public login: string = "";
  public loading: boolean = true;
  public changePas: string = "";
  public rename: string = "";
  constructor(public userService: UserService) {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      login: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    let elem = document.querySelectorAll(".modal");
    const options = {};
    M.Modal.init(elem, options);
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.userService
      .getUserInfo(undefined, "all")
      .then((res) => {
        this.users = res;
        this.loading = false;
        this.sortUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUser() {
    const login = this.form.get("login")?.value;
    const name = this.form.get("name")?.value;
    const password = this.form.get("password")?.value;
    const role = this.form.get("role")?.value;
    this.userService
      .addUser(login, password, name, role)
      .then(() => {
        this.userService.getUserInfo(undefined, "all").then((res) => {
          this.users = res;
          console.log(res);
          this.sortUsers();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteUser(id: string) {
    this.userService
      .deleteUser(id)
      .then((res) => {
        console.log(res);
        this.userService.getUserInfo(undefined, "all").then((res) => {
          this.users = res;
          this.sortUsers();
        });
      })
      .catch((err) => {
        if (err.error.error === "super admin never die") {
          M.toast({ html: "Пользователя нельзя удалить" });
        }
        if (err.error.error === "api forbidden by user, only for super admin") {
          M.toast({ html: "Доступ запрещен" });
        }
      });
  }

  sortUsers() {
    this.users.sort((a) => {
      if (a.role === "admin") {
        return -1;
      } else {
        return 1;
      }
    });
    this.users.sort((a) => {
      if (a.groupsPermissions.super) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  changeState(id: string, state: boolean, index: number) {
    this.users[index].activeState = !state;
    this.userService
      .changeUserState(id, !state)
      .then((res) => {
        if (res) {
          M.toast({ html: "Успешно" });
        }
      })
      .catch((err) => {
        if (err.error.error === "api forbidden by user") {
          M.toast({ html: "Доступ запрещен" });
        }
      });
  }

  getLogin(login: string) {
    this.userService.lowerCase = false;
    this.userService.upperCase = false;
    this.userService.number = false;
    this.userService.specialChar = false;
    this.userService.passLength = 0;
    this.changePas = "";
    this.login = login;
  }

  changeUserPassword(login: string, password: string) {
    this.userService
      .changeUserPassword(login, password)
      .then((res) => {
        let elem = document.getElementById("changeUserPass");
        let inst = M.Modal.getInstance(elem);
        inst.close();
        this.changePas = "";
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renameUser(login: string, name: string) {
    this.userService
      .renameUSer(login, name)
      .then((res) => {
        console.log(res);
        this.getAllUsers();
      })
      .catch((err) => {
        M.toast({ html: err.error.error });
      });
  }
}
//VhG2NXs3_
