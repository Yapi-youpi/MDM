import { Pipe, PipeTransform } from '@angular/core';

import { App } from "../../../types/apps";

@Pipe({
  name: 'system'
})
export class SystemPipe implements PipeTransform {
  transform(apps: App[], isSystem: boolean = false): App[] {
    if (isSystem) {
      return apps.filter(a => a.system)
    } else return apps
  }
}
