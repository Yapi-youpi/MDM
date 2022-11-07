import { Injectable } from '@angular/core';
import { IGroupPermissions } from '../../types';
import { userService } from '../../services';
import { PermissionsLoaderClass } from './permissions-loader.class';

@Injectable({
  providedIn: 'root',
})
export class PermissionsClass {
  public array: IGroupPermissions[] = [];

  constructor(
    private service: userService,
    private loader: PermissionsLoaderClass
  ) {}

  set(event: any, role) {
    this.array[role][event.target.value] = !!event.target.checked;
  }

  get() {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .getPermissions()
        .then((res) => {
          if (res) {
            this.array = res;
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  change(permissions) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.service
        .changePermissions(permissions)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }
}
