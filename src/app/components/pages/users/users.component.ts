import { Component, OnInit } from '@angular/core';

import { Users } from '../../../interfaces/interfaces';
import { interval } from 'rxjs';
import { AssetService } from '../../../shared/services/asset.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: Users[] = [];
  public userRole = '';
  public userLogin = '';
  public currentUser: Users | undefined; // undefined is need for reset currentUser
  public search!: string;
  public loaded: boolean = false;
  public filter_roles!: Array<string>;
  public filter_groups!: Array<string>;
  constructor(public asset: AssetService, public userService: UserService) {}

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
        this.asset.getFromStorage('user-role').then((role: string) => {
          this.userRole = role;
        });
        this.asset.getFromStorage('login').then((login: string) => {
          this.userLogin = login;
        });
      }
    });
  }

  getAllUsers() {
    this.userService
      .getUserInfo(undefined, 'all')
      .then((res) => {
        console.log(res);
        this.users = res;
        this.users.forEach((user) => {
          if (
            user.avatar.length > 0 &&
            !user.avatar.includes('data:image/jpeg;base64,')
          )
            user.avatar = 'data:image/jpeg;base64,' + user.avatar;
        });
        this.sortUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sortUsers() {
    this.users.sort((a) => {
      return a.role === 'admin' ? -1 : 1;
    });
    this.users.sort((a) => {
      return a.groupsPermissions.super ? -1 : 1;
    });
  }

  setCurrentUser(user?: Users | undefined) {
    this.currentUser = user;
  }

  applyFilter(filter) {
    this.filter_roles = filter.roles;
    this.filter_groups = filter.groups;
  }

  closeModal(changes) {
    this.currentUser = undefined;
    if (changes) {
      this.getAllUsers();
    }
  }
}

//VhG2NXs3_
