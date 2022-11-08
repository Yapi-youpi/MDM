import { Component, OnInit } from '@angular/core';

import { AssetService } from '../../../shared/services/asset.service';
import { IUser } from '../../../shared/types';
import { LoaderClass, MyUserClass, UsersClass } from '../../../shared/classes';
import { interval } from 'rxjs';

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
    private users: UsersClass,
    private myUser: MyUserClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
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
