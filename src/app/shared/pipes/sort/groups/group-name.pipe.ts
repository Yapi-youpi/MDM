import { Pipe, PipeTransform } from '@angular/core';

import { DevicesGroup } from '../../../types/groups';

@Pipe({
  name: 'group_name',
})
export class GroupNamePipe implements PipeTransform {
  transform(groups: DevicesGroup[], isNameAsc: boolean): DevicesGroup[] {
    // FROM A ENG TO A RU
    if (isNameAsc)
      return groups.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    // FROM A RU TO A ENG
    else
      return groups.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
  }
}
