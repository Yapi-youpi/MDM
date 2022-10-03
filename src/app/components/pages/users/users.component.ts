import { Component, OnInit } from '@angular/core';

import { AssetService } from '../../../shared/services/asset.service';
import { UserService } from '../../../shared/services/user.service';
import { IUser } from '../../../shared/types/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public title = 'Пользователи';
  public users: IUser[] = [];
  public userRole = '';
  public userLogin = '';
  public currentUser: IUser | undefined; // undefined is need for reset currentUser
  public search!: string;
  public loaded: boolean = false;
  public filter_roles!: Array<string>;
  public filter_groups!: Array<string>;
  constructor(public asset: AssetService, public userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
    this.asset.getFromStorage('user-role').then((role: string) => {
      this.userRole = role;
    });
    this.asset.getFromStorage('login').then((login: string) => {
      this.userLogin = login;
    });
  }

  getAllUsers() {
    this.userService.get(undefined, 'all').then((res) => {
      // console.log(res);
      if (res) {
        this.users = res;
        this.users.forEach((user) => {
          if (
            user.avatar.length > 0 &&
            !user.avatar.includes('data:image/jpeg;base64,')
          )
            user.avatar = 'data:image/jpeg;base64,' + user.avatar;
        });
        this.sortUsers();
      }
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

  setCurrentUser(user?: IUser | undefined) {
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
