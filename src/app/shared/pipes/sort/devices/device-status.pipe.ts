import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../types/devices";

@Pipe({
  name: "devices_status",
})
export class DeviceStatusPipe implements PipeTransform {
  transform(devices: Device[], isStatusAsc: boolean): Device[] {
    // TODO: ADD COMPARISON WITH UNREGISTERED STATE
    if (isStatusAsc)
      return devices.sort((a, b) =>
        a.active_state > b.active_state
          ? 1
          : a.active_state < b.active_state
          ? -1
          : 0
      );
    else
      return devices.sort((a, b) =>
        a.active_state < b.active_state
          ? 1
          : a.active_state > b.active_state
          ? -1
          : 0
      );
  }
}
