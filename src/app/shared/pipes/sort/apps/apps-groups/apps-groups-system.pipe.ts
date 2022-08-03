import { Pipe, PipeTransform } from "@angular/core";

import { AppGroup } from "../../../../types/apps";

@Pipe({
  name: "apps_group_system",
})
export class AppsGroupsSystemPipe implements PipeTransform {
  transform(apps: AppGroup[], isSystem: boolean = false): AppGroup[] {
    if (isSystem) {
      return apps.filter((a) => a.system);
    } else return apps;
  }
}
