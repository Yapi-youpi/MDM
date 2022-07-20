import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../types/devices";

@Pipe({
  name: "devicesByDate",
})
export class DatePipe implements PipeTransform {
  transform(devices: Device[], isDateAsc: boolean): Device[] {
    if (isDateAsc)
      return devices.sort((a, b) => -a.updatedAt.localeCompare(b.updatedAt));
    else return devices.sort((a, b) => -b.updatedAt.localeCompare(a.updatedAt));
  }
}
