import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import M from 'materialize-css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../services/asset.service';
import { Users } from '../interfaces/interfaces';
import { interval } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public form: FormGroup;
  public users: Users[] = [];
  public login: string = '';
  public loading: boolean = true;
  constructor(private userService: UserService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    let elem = document.querySelectorAll('.modal');
    M.Modal.init(elem);
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.userService
      .getUserInfo(undefined, 'all')
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
    const login = this.form.get('login')?.value;
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    const role = this.form.get('role')?.value;
    this.userService
      .addUser(login, password, name, role)
      .then(() => {
        this.userService.getUserInfo(undefined, 'all').then((res) => {
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
        this.userService.getUserInfo(undefined, 'all').then((res) => {
          this.users = res;
          this.sortUsers();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sortUsers() {
    this.users.sort((a) => {
      if (a.role === 'admin') {
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
          M.toast({ html: 'Успешно' });
        }
      })
      .catch((err) => {
        console.log(err);
        M.toast({ html: err.error.error });
      });
  }
  getLogin(login: string) {
    this.login = login;
  }
  changeUserPassword(login: string, password: string) {
    this.userService
      .changeUserPassword(login, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//VhG2NXs3_
