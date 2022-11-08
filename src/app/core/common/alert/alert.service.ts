import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IAlert {
  title: string;
  message: string;
  show?: boolean;
  type?: 'success' | 'error';
  progressWidth?: string;
}

@Injectable()
export class AlertService {
  private _alert$: BehaviorSubject<IAlert> = new BehaviorSubject<IAlert>({
    title: '',
    message: '',
    show: false,
  });

  constructor() {}

  get alert() {
    return this._alert$;
  }

  show(data: IAlert) {
    this._alert$.next({
      ...data,
      show: true,
      progressWidth: '100%',
    });
  }

  hide() {
    this._alert$.next({
      ...this._alert$.value,
      show: false,
    });
  }
}
