import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../../interfaces/devices";

@Pipe({
  name: "devicesByStatus",
})
export class StatusPipe implements PipeTransform {
  transform(devices: Device[], isStatusAsc: boolean): Device[] {
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
