import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../types/devices";

@Pipe({
  name: "devices_date",
})
export class DeviceDatePipe implements PipeTransform {
  transform(devices: Device[], isDateAsc: boolean): Device[] {
    if (isDateAsc)
      return devices.sort((a, b) => -a.updatedAt.localeCompare(b.updatedAt));
    else return devices.sort((a, b) => -b.updatedAt.localeCompare(a.updatedAt));
  }
}
