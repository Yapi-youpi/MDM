import { Injectable } from '@angular/core';
import { IMessage } from '../../types';
import { pagerService } from '../../services';
import { LoaderClass } from '../loader.class';

@Injectable({
  providedIn: 'root',
})
export class PagerClass {
  public messages: IMessage[] = [];

  constructor(private _loader: LoaderClass, private _service: pagerService) {}

  sort() {
    this.messages = this.messages.sort((a, b) => b.id - a.id);
  }

  get() {
    return new Promise<boolean>((resolve) => {
      this._loader.start('messages');

      this._service.get().then((res) => {
        if (res) {
          this.messages = res;
          this.sort();
          resolve(true);
        } else resolve(false);
      });
    }).finally(() => this._loader.end());
  }

  send(id: string, message: string, param: string) {
    return new Promise<boolean>((resolve) => {
      this._loader.start('messages');

      this._service.send(id, message, param).then((res) => resolve(res));
    }).finally(() => this._loader.end());
  }
}
