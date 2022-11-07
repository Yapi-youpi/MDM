import { Pipe, PipeTransform } from '@angular/core';

import { IDevice } from '../../../types';

@Pipe({
  name: 'devices_battery',
})
export class DeviceBatteryPipe implements PipeTransform {
  transform(devices: IDevice[], isBatteryAsc: boolean): IDevice[] {
    // FROM 100 TO 0
    if (isBatteryAsc)
      return devices.sort((a, b) => b.battery_percent - a.battery_percent);
    // FROM 0 TO 100
    else return devices.sort((a, b) => a.battery_percent - b.battery_percent);
  }
}
