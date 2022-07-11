import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../../interfaces/devices";
import { DevicesGroups } from "../../../../interfaces/groups";

@Pipe({
  name: "devicesByGroup",
})
export class GroupPipe implements PipeTransform {
  transform(
    devices: Device[],
    groups: DevicesGroups[],
    isGroupAsc: boolean
  ): Device[] {
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
