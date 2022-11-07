import { Injectable } from '@angular/core';
import { UsersLoaderClass } from './users-loader.class';
import { userService } from '../../services';
import { IPermissions, IUser } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UsersClass {
  public array: IUser[] = [];
  public tags: string[] = [];
  public permissions: IPermissions[] = [];

  public current: IUser | null = null;

  constructor(private loader: UsersLoaderClass, private service: userService) {}

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
      this.loader.start();

      this.service
        .get(undefined, 'all')
        .then((res) => {
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
        })
        .finally(() => this.loader.end());
    });
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
      this.loader.start();

      this.service
        .add(avatar, login, password, name, role, tags)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  delete(id: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .delete(id)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  getTags() {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .getTags()
        .then((res) => {
          if (res) {
            this.tags = res;
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  changeTag(id: string, tags: string[]) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .changeTag(id, tags)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
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
      this.loader.start();

      this.service
        .changeUserPassword(login, password)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  uploadAvatar(id: string, avatar: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .uploadAvatar(id, avatar)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }

  rename(login: string, name: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .rename(login, name)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }
}
