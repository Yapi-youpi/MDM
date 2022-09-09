import { Pipe, PipeTransform } from '@angular/core';

import { App } from '../../../types/apps';

@Pipe({
  name: 'apps_system',
})
export class AppsSystemPipe implements PipeTransform {
  transform(apps: App[], isSystem: boolean = false): App[] {
    return apps.filter((a) => a.system === isSystem);
  }
}
