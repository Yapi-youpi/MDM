import { Pipe, PipeTransform } from '@angular/core';
import { IApp } from '../../../types/apps';

@Pipe({
  name: 'appsConfig',
})
export class AppsConfigPipe implements PipeTransform {
  transform(apps: IApp[], inConfig: string[], param: boolean = false): IApp[] {
    if (inConfig) {
      const filterSet = new Set(inConfig);
      return param
        ? apps.filter((app) => filterSet.has(app.ID))
        : apps.filter((app) => !filterSet.has(app.ID));
    } else return apps;
  }
}
