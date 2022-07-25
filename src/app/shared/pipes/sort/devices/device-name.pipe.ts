import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../types/devices";

@Pipe({
  name: "devices_name",
})
export class DeviceNamePipe implements PipeTransform {
  transform(devices: Device[], isNameAsc: boolean): Device[] {
    if (isNameAsc)
      return devices.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    else
      return devices.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
  }
}
