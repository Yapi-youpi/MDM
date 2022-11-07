import { Injectable } from '@angular/core';
import { userService } from '../../services';
import { IPermissions, IUser } from '../../types';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class UsersClass {
  public array: IUser[] = [];
  public tags: string[] = [];
  public permissions: IPermissions[] = [];

  public current: IUser | null = null;

  constructor(private _loader: LoaderClass, private _service: userService) {}

  setCurrent(user: IUser | null = null) {
    this.current = user;
  }

  sortUsers() {
    this.array.sort((a) => {
      return a.role === 'admin' ? -1 : 1;
    });
    this.array.sort((a) => {
      return a.groupsPermissions.super ? -1 : 1;
    });
  }

  get() {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.get(undefined, 'all').then((res) => {
        if (res) {
          this.array = res;
          this.array.forEach((user) => {
            if (
              user.avatar.length > 0 &&
              !user.avatar.includes('data:image/jpeg;base64,')
            )
              user.avatar = 'data:image/jpeg;base64,' + user.avatar;
          });
          this.sortUsers();
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  add(
    avatar: string,
    login: string,
    password: string,
    name: string,
    role: string,
    tags: string[]
  ) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service
        .add(avatar, login, password, name, role, tags)
        .then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  delete(id: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.delete(id).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  getTags() {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.getTags().then((res) => {
        if (res) {
          this.tags = res;
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  changeTag(id: string, tags: string[]) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.changeTag(id, tags).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  // deleteTag(tag: string) {
  //   return new Promise<boolean>((resolve) => {
  //     this.loader.start();
  //
  //     this.service
  //       .deleteTag(tag)
  //       .then((res) => resolve(res))
  //       .finally(() => this.loader.end());
  //   });
  // }

  changePassword(login: string, password: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service
        .changeUserPassword(login, password)
        .then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  uploadAvatar(id: string, avatar: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.uploadAvatar(id, avatar).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }

  rename(login: string, name: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('users');

      this._service.rename(login, name).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }
}
