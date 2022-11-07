import { Injectable } from '@angular/core';
import { IGroupPermissions } from '../../types';
import { userService } from '../../services';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class PermissionsClass {
  public array: IGroupPermissions[] = [];

  constructor(private _service: userService, private _loader: LoaderClass) {}

  set(event: any, role) {
    this.array[role][event.target.value] = !!event.target.checked;
  }

  get() {
    return new Promise<boolean>((resolve) => {
      this._loader.start('permissions');

      this._service.getPermissions().then((res) => {
        if (res) {
          this.array = res;
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  change(permissions) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('permissions');

      this._service.changePermissions(permissions).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }
}
