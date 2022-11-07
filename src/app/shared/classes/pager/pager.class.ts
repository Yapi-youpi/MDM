import { Injectable } from '@angular/core';
import { IMessage } from '../../types';
import { PagerLoaderClass } from './pager-loader.class';
import { pagerService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class PagerClass {
  public messages: IMessage[] = [];

  constructor(private loader: PagerLoaderClass, private pager: pagerService) {}

  sort() {
    this.messages = this.messages.sort((a, b) => b.id - a.id);
  }

  get() {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.pager
        .get()
        .then((res) => {
          if (res) {
            this.messages = res;
            this.sort();
            resolve(true);
          } else resolve(false);
        })
        .finally(() => this.loader.end());
    });
  }

  send(id: string, message: string, param: string) {
    return new Promise<boolean>((resolve) => {
      this.loader.start();

      this.pager
        .send(id, message, param)
        .then((res) => resolve(res))
        .finally(() => this.loader.end());
    });
  }
}
