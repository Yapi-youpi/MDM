import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Alert } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public data!: Alert;
  public open = new Subject<Alert>();

  constructor() {}

  show(data: Alert) {
    this.data = { ...data, show: true, progressWidth: '100%' };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
