import { Injectable } from '@angular/core';
import { LiveQuerySubscription } from 'parse';

import { environment } from '../../../../environments/environment';

import { DeviceClass } from './device.class';

import { IDevice } from '../../types/devices';

import { DatabaseService } from '../../services/database.service';

@Injectable()
export class DeviceSubscriptionClass {
  private query!: Parse.Query;
  private sub!: LiveQuerySubscription;

  constructor(private db: DatabaseService, private device: DeviceClass) {}

  setParseQuery() {
    this.query = this.db.query(environment.parseClasses.devices);
  }

  unsubscribe() {
    if (this.sub) this.sub.unsubscribe();
  }

  async subscribe() {
    this.sub = await this.query.subscribe();

    this.sub.on('update', (item) => {
      const device: IDevice = item.attributes as IDevice;

      this.device.updateList(device);
    });

    this.sub.on('delete', (item) => {
      const device: IDevice = item.attributes as IDevice;

      this.device.updateList(device, true);
    });

    this.sub.on('create', (item) => {
      const device: IDevice = item.attributes as IDevice;

      this.device.addToList(device);
    });
  }
}
