import { Pipe, PipeTransform } from '@angular/core';

import { IApp } from '../../../types';

@Pipe({
  name: 'apps_system',
})
export class AppsSystemPipe implements PipeTransform {
  transform(apps: IApp[], isSystem: boolean = false): IApp[] {
    return apps.filter((a) => a.system === isSystem);
  }
}
