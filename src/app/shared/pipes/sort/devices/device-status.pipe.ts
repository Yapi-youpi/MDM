import { Pipe, PipeTransform } from '@angular/core';

import { IDevice } from '../../../types';

@Pipe({
  name: 'devices_status',
})
export class DeviceStatusPipe implements PipeTransform {
  transform(devices: IDevice[], isStatusAsc: boolean): IDevice[] {
    // FROM REGISTERED AND ACTIVE TO INACTIVE AND UNREGISTERED
    if (isStatusAsc)
      return devices.sort((a, b) =>
        !b.registration_state && !a.registration_state
          ? 0
          : !b.registration_state && a.registration_state
          ? -1
          : b.registration_state && !a.registration_state
          ? 1
          : b.registration_state && a.registration_state
          ? b.active_state > a.active_state
            ? 1
            : b.active_state < a.active_state
            ? -1
            : 0
          : 0
      );
    // FORM UNREGISTERED AND INACTIVE TO REGISTERED AND ACTIVE
    else
      return devices.sort((a, b) =>
        !a.registration_state && !b.registration_state
          ? 0
          : !a.registration_state && b.registration_state
          ? -1
          : a.registration_state && !b.registration_state
          ? 1
          : a.registration_state && b.registration_state
          ? a.active_state > b.active_state
            ? 1
            : a.active_state < b.active_state
            ? -1
            : 0
          : 0
      );
  }
}
