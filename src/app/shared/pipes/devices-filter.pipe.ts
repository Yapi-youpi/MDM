import { Pipe, PipeTransform } from "@angular/core";
import { Device } from "../../interfaces/interfaces";
import * as moment from "moment";

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
    if (!status && !dateFrom && !dateTo && !configIDs && !groupIDs) {
      return devices;
    } else {
      return devices.filter((d) => {
        return (
          (status ? d.active_state : !d.active_state) &&
          (dateFrom ? d.updatedAt > dateFrom : d.updatedAt > "") &&
          (dateTo ? d.updatedAt < dateTo : moment.utc(Infinity).format()) &&
          (configIDs && configIDs.length !== 0
            ? configIDs.some((el) => d.device_config_id.includes(el))
            : d) &&
          (groupIDs && groupIDs.length !== 0
            ? groupIDs.some((el) => d.device_group_id.includes(el))
            : d)
        );
      });
    }
  }
}
