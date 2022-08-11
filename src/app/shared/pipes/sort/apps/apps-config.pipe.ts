import { Pipe, PipeTransform } from '@angular/core';
import { App } from '../../../types/apps';

@Pipe({
  name: 'appsConfig',
})
export class AppsConfigPipe implements PipeTransform {
  transform(apps: App[], inConfig: string[], param: boolean = false): App[] {
    if (inConfig) {
      const filterSet = new Set(inConfig);
      return param
        ? apps.filter((app) => filterSet.has(app.ID))
        : apps.filter((app) => !filterSet.has(app.ID));
    } else return apps;
  }
}
