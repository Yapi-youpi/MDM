import { Pipe, PipeTransform } from "@angular/core";

import { App } from "../../../types/apps";

@Pipe({
  name: "appsSize",
})
export class AppsSizePipe implements PipeTransform {
  transform(devices: App[], isBatteryAsc: boolean): App[] {
    // if (isBatteryAsc)
    //   return devices.sort((a, b) => a.fileSize - b.fileSize);
    // else return devices.sort((a, b) => b.fileSize - a.fileSize);
    return [];
  }
}
