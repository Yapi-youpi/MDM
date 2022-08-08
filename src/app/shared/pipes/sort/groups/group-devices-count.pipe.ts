import { Pipe, PipeTransform } from '@angular/core';

import { DevicesGroup } from '../../../types/groups';

@Pipe({
  name: 'group_devices_count',
})
export class GroupDevicesCountPipe implements PipeTransform {
  transform(
    groups: DevicesGroup[],
    isDevicesCountAsc: boolean
  ): DevicesGroup[] {
    if (isDevicesCountAsc)
      // FROM 100 TO 0
      return groups.sort((a, b) => b.capacity - a.capacity);
    // FROM 0 TO 100
    else return groups.sort((a, b) => a.capacity - b.capacity);
  }
}
