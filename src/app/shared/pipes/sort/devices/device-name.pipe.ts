import { Pipe, PipeTransform } from '@angular/core';

import { Device } from '../../../types/devices';

@Pipe({
  name: 'devices_name',
})
export class DeviceNamePipe implements PipeTransform {
  transform(devices: Device[], isNameAsc: boolean): Device[] {
    // FROM A ENG TO A RU
    if (isNameAsc)
      return devices.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    // FROM A RU TO A ENG
    else
      return devices.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
  }
}
