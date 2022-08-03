import { Pipe, PipeTransform } from "@angular/core";

import { AppGroup } from "../../../../types/apps";

@Pipe({
  name: "apps_groups_size",
})
export class AppsGroupsSizePipe implements PipeTransform {
  transform(apps: AppGroup[], isSizeAsc: boolean = false): AppGroup[] {
    return isSizeAsc
      ? // FROM BIG TO SMALL
        apps.sort((a, b) => b.fileByteSize - a.fileByteSize)
      : // FROM SMALL TO BIG
        apps.sort((a, b) => a.fileByteSize - b.fileByteSize);
  }
}
