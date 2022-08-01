import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../types/devices";

@Pipe({
  name: "devicesFilter",
})
export class DevicesFilterPipe implements PipeTransform {
  transform(
    devices: Device[] | null,
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null,
    groupIDs: string[] | null
  ): Device[] {
    if (!devices) return [];
    else {
      return devices.filter((d) => {
        return (
          (status !== null ? d.active_state === status : d) &&
          (dateFrom ? d.updatedAt > dateFrom : d) &&
          (dateTo ? d.updatedAt < dateTo : d) &&
          (configIDs && configIDs.length !== 0
            ? configIDs.some((el) => d.device_config_id === el)
            : d) &&
          (groupIDs && groupIDs.length !== 0
            ? groupIDs.some((el) => d.device_group_id === el)
            : d)
        );
      });
    }
  }
}
