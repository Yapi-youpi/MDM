import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

import { Device } from "../../../types/devices";

@Pipe({
  name: "devices_date",
})
export class DeviceDatePipe implements PipeTransform {
  transform(devices: Device[], isDateAsc: boolean): Device[] {
    // FROM NEW TO OLD
    if (isDateAsc)
      return devices.sort((a, b) => {
        if (moment(b.updatedAt) > moment(a.updatedAt)) return 1;
        else return -1;
      });
    // FROM OLD TO NEW
    else
      return devices.sort((a, b) => {
        if (moment(a.updatedAt) > moment(b.updatedAt)) return 1;
        else return -1;
      });
  }
}
