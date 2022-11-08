import { Pipe, PipeTransform } from '@angular/core';

import { IGroup } from '../../../types';

@Pipe({
  name: 'group_config',
})
export class GroupConfigPipe implements PipeTransform {
  transform(
    groups: IGroup[],
    configs: { name: string; value: string }[],
    isConfigsAsc: boolean
  ): IGroup[] {
    if (configs.length === 0) return groups;
    if (isConfigsAsc)
      // FROM A ENG TO A RU
      return groups.sort((a, b) => {
        const idxB = configs.map((e) => e.value).indexOf(b.deviceConfigID);
        const idxA = configs.map((e) => e.value).indexOf(a.deviceConfigID);

        return configs[idxB].name
          .toLowerCase()
          .localeCompare(configs[idxA].name);
      });
    // FROM A RU TO A ENG
    else
      return groups.sort((a, b) => {
        const idxA = configs.map((e) => e.value).indexOf(a.deviceConfigID);
        const idxB = configs.map((e) => e.value).indexOf(b.deviceConfigID);

        return configs[idxA].name
          .toLowerCase()
          .localeCompare(configs[idxB].name);
      });
  }
}
