import { Pipe, PipeTransform } from "@angular/core";

import { App } from "../../../types/apps";

@Pipe({
  name: "apps_name",
})
export class AppsNamePipe implements PipeTransform {
  transform(apps: App[], isNameAsc: boolean): App[] {
    if (isNameAsc)
      return apps.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    else
      return apps.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
  }
}
