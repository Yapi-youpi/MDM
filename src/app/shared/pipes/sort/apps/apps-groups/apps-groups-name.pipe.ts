import { Pipe, PipeTransform } from "@angular/core";

import { AppGroup } from "../../../../types/apps";

@Pipe({
  name: "apps_groups_name",
})
export class AppsGroupsNamePipe implements PipeTransform {
  transform(apps: AppGroup[], isNameAsc: boolean): AppGroup[] {
    // FROM A ENG TO A RU
    if (isNameAsc)
      return apps.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    // FROM A RU TO A ENG
    else
      return apps.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
  }
}
