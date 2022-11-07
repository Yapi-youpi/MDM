import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { IDevice } from '../../../types';

@Pipe({
  name: 'devices_date',
})
export class DeviceDatePipe implements PipeTransform {
  transform(devices: IDevice[], isDateAsc: boolean): IDevice[] {
    // FROM NEW TO OLD
    if (isDateAsc)
      return devices.sort((a, b) =>
        moment(b.updatedAt) > moment(a.updatedAt)
          ? 1
          : moment(b.updatedAt) < moment(a.updatedAt)
          ? -1
          : 0
      );
    // FROM OLD TO NEW
    else
      return devices.sort((a, b) =>
        moment(a.updatedAt) > moment(b.updatedAt)
          ? 1
          : moment(a.updatedAt) < moment(b.updatedAt)
          ? -1
          : 0
      );
  }
}
