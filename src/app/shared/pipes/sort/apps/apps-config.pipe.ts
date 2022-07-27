import { Pipe, PipeTransform } from '@angular/core';
import { App } from '../../../types/apps';

@Pipe({
  name: 'appsConfig',
})
export class AppsConfigPipe implements PipeTransform {
  transform(apps: App[], inConfig: string[]): App[] {
    if (inConfig) {
      const filterSet = new Set(inConfig);
      return apps.filter((app) => filterSet.has(app.ID));
    } else return apps;
  }
}
