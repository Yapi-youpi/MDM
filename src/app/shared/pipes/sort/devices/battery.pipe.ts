import { Pipe, PipeTransform } from "@angular/core";

import { Device } from "../../../../interfaces/devices";

@Pipe({
  name: "devicesByBattery",
})
export class BatteryPipe implements PipeTransform {
  transform(devices: Device[], isBatteryAsc: boolean): Device[] {
    if (isBatteryAsc)
      return devices.sort((a, b) => a.battery_percent - b.battery_percent);
    else return devices.sort((a, b) => b.battery_percent - a.battery_percent);
  }
}
