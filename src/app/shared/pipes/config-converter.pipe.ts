import { Pipe, PipeTransform } from "@angular/core";

import { DevicesConfig } from "../../interfaces/config";

@Pipe({
  name: "configConverter",
})
export class ConfigConverterPipe implements PipeTransform {
  transform(id: string, groups: DevicesConfig[]): string {
    const idx = groups.map((e) => e.ID).indexOf(id);
    if (idx >= 0) return groups[idx].name;
    else return "";
  }
}
