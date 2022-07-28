import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

import { Device } from "../../types/devices";

@Pipe({
  name: "devicesFilter",
})
export class DevicesFilterPipe implements PipeTransform {
  transform(
    devices: Device[],
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null,
    groupIDs: string[] | null
  ): Device[] {
    return devices.filter((d) => {
      return (
        (status !== null ? d.active_state === status : d) &&
        (dateFrom ? d.updatedAt > dateFrom : d.updatedAt > "") &&
        (dateTo
          ? d.updatedAt < dateTo
          : d.updatedAt < moment.utc(Infinity).format()) &&
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
