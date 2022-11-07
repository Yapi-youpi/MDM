import { Pipe, PipeTransform } from '@angular/core';

import { IGroup } from '../../../types';

@Pipe({
  name: 'group_devices_count',
})
export class GroupDevicesCountPipe implements PipeTransform {
  transform(groups: IGroup[], isDevicesCountAsc: boolean): IGroup[] {
    if (isDevicesCountAsc)
      // FROM 100 TO 0
      return groups.sort((a, b) => b.capacity - a.capacity);
    // FROM 0 TO 100
    else return groups.sort((a, b) => a.capacity - b.capacity);
  }
}
