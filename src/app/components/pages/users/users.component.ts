import { Component, OnInit } from '@angular/core';

import { AssetService } from '../../../shared/services/asset.service';
import { IUser } from '../../../shared/types/users';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';
import { UsersClass } from '../../../shared/classes/users/users.class';
import { interval } from 'rxjs';
import { UsersLoaderClass } from '../../../shared/classes/users/users-loader.class';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public title = 'Пользователи';

  public search!: string;

  public filter_roles!: Array<string>;
  public filter_groups!: Array<string>;

  constructor(
    public asset: AssetService,
    public users: UsersClass,
    private myUser: MyUserClass,
    private loader: UsersLoaderClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _role() {
    return this.myUser.role;
  }

  get _users() {
    return this.users.array;
  }

  get _current() {
    return this.users.current;
  }

  get _me() {
    return this.myUser.me;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        i.unsubscribe();
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.users.get().then();
  }

  setCurrentUser(user: IUser | null = null) {
    this.users.setCurrent(user);
  }

  applyFilter(filter) {
    this.filter_roles = filter.roles;
    this.filter_groups = filter.groups;
  }

  closeModal(changes) {
    this.setCurrentUser();
    if (changes) {
      this.getAllUsers();
    }
  }
}
