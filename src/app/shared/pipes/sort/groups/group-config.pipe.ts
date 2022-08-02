import { Pipe, PipeTransform } from "@angular/core";

import { DevicesGroup } from "../../../types/groups";

@Pipe({
  name: "group_config",
})
export class GroupConfigPipe implements PipeTransform {
  transform(
    groups: DevicesGroup[],
    configs: { name: string; value: string }[],
    isConfigsAsc: boolean
  ): DevicesGroup[] {
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
