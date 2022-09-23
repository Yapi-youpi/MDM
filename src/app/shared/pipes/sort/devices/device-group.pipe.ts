import { Pipe, PipeTransform } from '@angular/core';

import { IDevice } from '../../../types/devices';
import { DevicesGroup } from '../../../types/groups';

@Pipe({
  name: 'devices_group',
})
export class DeviceGroupPipe implements PipeTransform {
  transform(
    devices: IDevice[],
    groups: DevicesGroup[],
    isGroupAsc: boolean
  ): IDevice[] {
    if (groups && groups.length !== 0) {
      return devices.sort((a, b) => {
        const aIDX = groups.map((e) => e.id).indexOf(a.device_group_id);
        const aGroupName = groups[aIDX].name;
        const bIDX = groups.map((e) => e.id).indexOf(b.device_group_id);
        const bGroupName = groups[bIDX].name;

        if (isGroupAsc)
          return aGroupName > bGroupName ? 1 : aGroupName < bGroupName ? -1 : 0;
        else
          return aGroupName < bGroupName ? 1 : aGroupName > bGroupName ? -1 : 0;
      });
    }

    return devices;
  }
}
